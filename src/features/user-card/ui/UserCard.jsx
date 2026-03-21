import { ProfileCard } from '@/shared/ui/ProfileCard.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { useLogoutUser, useFollowUser, useCurrentUser } from '@/entities/user/api/index.js';
import { useParams } from 'react-router-dom';
import { useUploadAvatar } from '@/entities/user/api/use-upload-avatar.js';
import { useUserDetails } from '@/entities/user/api/use-user-details.js';
import { useUserSubscribers } from '@/entities/user/api/use-user-subscribers.js';
import { useUnfollowUser } from '@/entities/user/api/use-unfollow-user.js';
import { useCallback, useMemo } from 'react';
import { MODAL_NAMES, useModalStore } from '@/entities/modal/index.js';

export const UserCard = () => {
  const { id: userId } = useParams();
  const { data: userDetails, refetch: refetchUserDetails } = useUserDetails(userId);
  const { data: subscribers = [], refetch, isRefetching } = useUserSubscribers(userId);
  const { setCurrentModal } = useModalStore();
  const { isPending: isPendingLogout } = useLogoutUser();
  const { mutateAsync: follow, isPending: isPendingFollow } = useFollowUser();
  const { mutateAsync: unfollow, isPending: isPendingUnfollow } = useUnfollowUser();
  const { uploadAvatar, isPending: isPendingAvatarUpload } = useUploadAvatar();
  const { isAuthenticated, user } = useCurrentUser();

  const isOwnProfile = isAuthenticated && user?.id === userId;

  const profileData = useMemo(() => {
    return isOwnProfile ? user : userDetails;
  }, [isOwnProfile, user, userDetails]);

  const isAlreadyFollowing = useMemo(
    () => subscribers.some((subscriber) => subscriber.id === user?.id),
    [subscribers, user]
  );

  const handleAction = useCallback(async () => {
    if (isOwnProfile) {
      setCurrentModal(MODAL_NAMES.LOGOUT_CONFIRMATION);
    } else {
      isAlreadyFollowing ? await unfollow(userId) : await follow(userId);
      await Promise.all([refetch(), refetchUserDetails()]);
    }
  }, [isOwnProfile, isAlreadyFollowing, unfollow, follow, userId, refetch, refetchUserDetails]);

  const handleUploadAvatar = async (file) => {
    if (!file) return;
    await uploadAvatar(file);
  };

  const buttonText = isOwnProfile ? 'LOG OUT' : isAlreadyFollowing ? 'UNFOLLOW' : 'FOLLOW';

  return (
    <div className="tablet:w-98.5 mx-auto flex w-full shrink-0 flex-col items-stretch">
      <ProfileCard
        {...profileData}
        isOwnProfile={isOwnProfile}
        onUploadAvatar={handleUploadAvatar}
      />

      <Button
        disabled={
          isPendingLogout ||
          isPendingFollow ||
          isPendingUnfollow ||
          isPendingAvatarUpload ||
          isRefetching
        }
        variant="dark"
        className="mt-8 w-full max-w-none rounded-4xl py-4 text-base font-bold tracking-wide uppercase shadow-sm"
        onClick={handleAction}
      >
        {buttonText}
      </Button>
    </div>
  );
};
