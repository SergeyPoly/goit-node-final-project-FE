import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useToastOnError = (isError, error, fallbackMessage = 'Server error') => {
  useEffect(() => {
    if (!isError) return;

    const serverMessage = error?.response?.data?.message || error?.response?.data?.error;
    toast.error(serverMessage || fallbackMessage);
  }, [isError, error, fallbackMessage]);
};
