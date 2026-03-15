import toast from 'react-hot-toast';
import { useRegisterUser } from '@/queries/user';
import { useCloseAuthModalOnSuccess } from '@/shared/lib/hooks/use-close-auth-modal-on-success';

export const useRegisterFormSubmit = () => {
  useCloseAuthModalOnSuccess();

  const { register, isPending } = useRegisterUser();

  const handleRegisterFormSubmit = async (values, { setFieldError }) => {
    try {
      await register(values);
    } catch (error) {
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
