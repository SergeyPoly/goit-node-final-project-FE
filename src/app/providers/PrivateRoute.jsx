import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MODAL_NAMES } from '@/entities/modal/constants';
import { useModalStore } from '@/entities/modal/store';
import { useCurrentUser } from '@/queries/user';
import { PageLoader } from '@/shared/ui/PageLoader';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const { setCurrentModal } = useModalStore();
  const { pathname } = useLocation();

  const showLoginModal = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (showLoginModal) {
      setCurrentModal(MODAL_NAMES.LOGIN, { navigateTo: pathname });
    }
  }, [showLoginModal, setCurrentModal, pathname]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return children;
};
