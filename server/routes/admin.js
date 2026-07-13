import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/payments', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;

    let query = req.supabase
      .from('payments')
      .select('*, profiles(full_name, email, phone)')
      .order('created_at', { ascending: false });

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Get payments error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

router.patch('/payments/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: payment } = await req.supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (!payment) {
      return res.status(404).json({ error: 'To\'lov topilmadi' });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Bu to\'lov allaqachon ko\'rib chiqilgan' });
    }

    const expiresAt = new Date();
    if (payment.plan_type === 'annual') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const { error: payError } = await req.supabase
      .from('payments')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', id);

    if (payError) throw payError;

    const { error: profileError } = await req.supabase
      .from('profiles')
      .update({
        is_pro: true,
        pro_plan: payment.plan_type,
        pro_expires_at: expiresAt.toISOString()
      })
      .eq('id', payment.user_id);

    if (profileError) throw profileError;

    res.json({ message: 'To\'lov tasdiqlandi', pro_expires_at: expiresAt.toISOString() });
  } catch (err) {
    console.error('Approve payment error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

router.patch('/payments/:id/reject', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: payment } = await req.supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (!payment) {
      return res.status(404).json({ error: 'To\'lov topilmadi' });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Bu to\'lov allaqachon ko\'rib chiqilgan' });
    }

    const { error } = await req.supabase
      .from('payments')
      .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'To\'lov rad etildi' });
  } catch (err) {
    console.error('Reject payment error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

router.get('/stats', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { count: users } = await req.supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const { count: proUsers } = await req.supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_pro', true);

    const { data: payments } = await req.supabase
      .from('payments')
      .select('amount, status');

    const totalRevenue = (payments || [])
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const { count: pendingPayments } = await req.supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    res.json({
      totalUsers: users || 0,
      proUsers: proUsers || 0,
      totalRevenue,
      pendingPayments: pendingPayments || 0
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

export default router;
