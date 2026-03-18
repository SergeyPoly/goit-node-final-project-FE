import { TabsList } from '@/widgets/layout/ui/TabsList/TabsList.jsx';
import { MainTitle } from '@/shared/ui/MainTitle.jsx';
import { Subtitle } from '@/shared/ui/Subtitle.jsx';
import { ProfileCard } from '@/shared/ui/ProfileCard.jsx';
import { PathInfo } from '@/shared/ui/PathInfo.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { useLogoutUser, useFollowUser, useCurrentUser } from '@/queries/user/index.js';
import { useParams } from 'react-router-dom';
import { useFollowing } from '@/queries/user/use-following.js';

const pathItems = [{ label: 'Home', href: '/' }, { label: 'Profile' }];

export const UserPage = () => {
  const { logout, isPending: isPendingLogout } = useLogoutUser();
  const { follow, isPending: isPendingFollow } = useFollowUser();
  const { isAuthenticated, user } = useCurrentUser();
  const { id: userId } = useParams();
  const isOwnProfile = isAuthenticated && user?.id === userId;
  const { data: followingList, isLoading: isPendingFollowing } = useFollowing();
  const isAlreadyFollowing = followingList?.some((u) => u.id === userId);

  const handleAction = () => {
    if (isOwnProfile) {
      logout();
    } else {
      follow({ targetUserId: userId });
    }
  };

  const buttonText = isOwnProfile ? 'LOG OUT' : isAlreadyFollowing ? 'FOLLOWING' : 'FOLLOW';

  return (
    <section className="container">
      <PathInfo items={pathItems} />
      <MainTitle className="tablet:mt-10 tablet:mb-5 mb-4">Profile</MainTitle>
      <Subtitle className="tablet:mb-10 mb-8 max-w-[443px]">
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
        with us.
      </Subtitle>
      <div className="desktop:flex-row tablet:gap-[80px] desktop:gap-[40px] flex flex-col gap-[64px]">
        <div className="tablet:w-[394px] mx-auto flex shrink-0 flex-col items-stretch">
          <ProfileCard
            {...user}
            isOwnProfile={isAuthenticated}
            onUploadAvatar={() => console.log('Open file picker')}
          />

          <Button
            disabled={isPendingLogout | isPendingFollow | isPendingFollowing | isAlreadyFollowing}
            variant={isAlreadyFollowing ? 'outline' : 'dark'}
            className="mt-8 w-full max-w-none rounded-4xl py-4 text-base font-bold tracking-wide uppercase shadow-sm"
            onClick={handleAction}
          >
            {buttonText}
          </Button>
        </div>
        <TabsList />
      </div>
    </section>
  );
};
