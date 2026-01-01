import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner className="h-screen" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
