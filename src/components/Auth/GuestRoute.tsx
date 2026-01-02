import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner className="h-screen w-full flex items-center justify-center" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

  return <Outlet />;
};
