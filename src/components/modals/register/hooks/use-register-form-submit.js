import toast from 'react-hot-toast';
import { useRegisterUser } from '@/queries/user';
import { useCloseAuthModalOnSuccess } from '@/shared/lib/hooks/use-close-auth-modal-on-success';
import { useState } from 'react';

export const useRegisterFormSubmit = () => {
  const [isPending, setIsPending] = useState(false);
  const { register } = useRegisterUser();

  useCloseAuthModalOnSuccess();

  const handleRegisterFormSubmit = async (values, { setFieldError }) => {
    try {
      setIsPending(true);

      await register(values);
    } catch (error) {
      setIsPending(false);

      if (error.status === 400) {
        if (error.message.includes('name')) {
          setFieldError('name', error.message);
        }
        if (error.message.includes('email')) {
          setFieldError('email', error.message);
        }
        if (error.message.includes('password')) {
          setFieldError('password', error.message);
        }
        return;
      }

      toast.error('Failed to register: ' + error.message);
    }
  };

  return { handleRegisterFormSubmit, isPending };
};
