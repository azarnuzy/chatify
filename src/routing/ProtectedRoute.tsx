import { Navigate } from 'react-router-dom';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userLocal] = useLocalStorage('user', null);
  if (!user || !userLocal) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};
