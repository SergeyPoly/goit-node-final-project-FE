import { useLoginUser } from '@/queries/user';
import { useCloseAuthModalOnSuccess } from '@/shared/lib/hooks/use-close-auth-modal-on-success';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useLoginFormSubmit = () => {
  const [isPending, setIsPending] = useState(false);
  const { login } = useLoginUser();

  useCloseAuthModalOnSuccess();

  const handleLoginFormSubmit = async (values, { setFieldError }) => {
    try {
      setIsPending(true);

      await login(values);
    } catch (error) {
      setIsPending(false);

      if (error.status === 400) {
        if (error.message.includes('email')) {
          setFieldError('email', error.message);
        }
        if (error.message.includes('password')) {
          setFieldError('password', error.message);
        }
        return;
      }

      if (error.status === 401) {
        toast.error('Email or password is wrong or the user is not found');
        return;
      }

      toast.error('Failed to login: ' + error.message);
    }
  };

  return { handleLoginFormSubmit, isPending };
};
