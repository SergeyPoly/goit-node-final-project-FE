import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { uploadUserAvatar } from '@/shared/api/endpoints/user';
import { queryClient } from '@/queries/queryClient';
import { QUERY_KEYS } from '@/queries/constants';

export const useUploadAvatar = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadUserAvatar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
    onError: () => {
      toast.error('Failed to upload avatar');
    },
  });

  return {
    uploadAvatar: mutateAsync,
    isPending,
  };
};
