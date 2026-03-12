import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/use-user-store.js';

export const PrivateRoute = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);
  return isAuth ? children : <Navigate replace to="/" />;
};
