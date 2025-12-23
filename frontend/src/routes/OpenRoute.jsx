import { useAuth } from '@/providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default OpenRoute;