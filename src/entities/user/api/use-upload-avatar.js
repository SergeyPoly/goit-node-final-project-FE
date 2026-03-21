import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { uploadUserAvatar } from '@/shared/api/endpoints/user.js';
import { queryClient } from '@/entities/user/queryClient.js';
import { QUERY_KEYS } from '@/entities/user/constants.js';

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
