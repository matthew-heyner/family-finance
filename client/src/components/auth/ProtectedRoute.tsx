import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

/**
 * Protected route component that redirects to login if user is not authenticated
 */
const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/login',
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 