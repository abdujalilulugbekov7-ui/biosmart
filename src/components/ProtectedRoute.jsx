import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="BioSmart platformasi yuklanmoqda..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
