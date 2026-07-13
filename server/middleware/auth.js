export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token talab qilinadi' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await req.supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Token yaroqsiz' });
  }

  req.user = user;
  next();
}

export async function requireAdmin(req, res, next) {
  const { data: profile } = await req.supabase
    .from('profiles')
    .select('role')
    .eq('id', req.user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return res.status(403).json({ error: 'Admin huquqi talab qilinadi' });
  }

  next();
}
