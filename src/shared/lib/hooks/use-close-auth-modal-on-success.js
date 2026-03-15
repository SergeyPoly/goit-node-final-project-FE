import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/entities/modal';
import { useCurrentUser } from '@/queries/user';

export const useCloseAuthModalOnSuccess = () => {
  const { closeCurrentModal, currentModal } = useModalStore();
  const navigate = useNavigate();

  const { isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (isAuthenticated) {
      const { navigateTo } = currentModal.data || {};

      closeCurrentModal();

      if (navigateTo) {
        navigate(navigateTo);
      }
    }
  }, [isAuthenticated, currentModal.data, closeCurrentModal, navigate]);
};
