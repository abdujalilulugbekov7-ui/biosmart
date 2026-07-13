import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/request', requireAuth, async (req, res) => {
  try {
    const { planType } = req.body;
    if (!['monthly', 'annual'].includes(planType)) {
      return res.status(400).json({ error: 'Noto\'g\'ri obuna turi' });
    }

    const amount = planType === 'monthly' ? 29000 : 199000;

    const { data: existing } = await req.supabase
      .from('payments')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'pending')
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: 'Sizda kutilayotgan to\'lov so\'rovi mavjud' });
    }

    const { data, error } = await req.supabase
      .from('payments')
      .insert({
        user_id: req.user.id,
        plan_type: planType,
        amount,
        status: 'pending',
        payment_method: 'cash'
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'To\'lov so\'rovi yuborildi', payment: data });
  } catch (err) {
    console.error('Subscription request error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

router.get('/my', requireAuth, async (req, res) => {
  try {
    const { data: payments } = await req.supabase
      .from('payments')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    const { data: profile } = await req.supabase
      .from('profiles')
      .select('is_pro, pro_plan, pro_expires_at')
      .eq('id', req.user.id)
      .single();

    res.json({ payments, subscription: profile });
  } catch (err) {
    console.error('Get my subscriptions error:', err);
    res.status(500).json({ error: 'Server xatoligi' });
  }
});

export default router;
