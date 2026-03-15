import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useToastOnError = (isError, error, message) => {
  useEffect(() => {
    if (!error) return;

    toast.error(message || error.message);
  }, [error, message]);
};
