import { useLoginUser } from '@/queries/user';
import { useCloseAuthModalOnSuccess } from '@/shared/lib/hooks/use-close-auth-modal-on-success';
import toast from 'react-hot-toast';

export const useLoginFormSubmit = () => {
  const { login, isPending } = useLoginUser();

  useCloseAuthModalOnSuccess();

  const handleLoginFormSubmit = async (values, { setFieldError }) => {
    try {
      await login(values);
    } catch (error) {
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
