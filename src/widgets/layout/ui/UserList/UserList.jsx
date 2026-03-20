import { useUserList } from '@/queries/user/use-user-list';
import { useFollowUser } from '@/queries/user/use-follow-user';
import { useUnfollowUser } from '@/queries/user/use-unfollow-user';
import { Pagination } from '@/shared/ui/Pagination';
import { FollowingCard, FollowingCardSkeleton } from '@/shared/ui/FollowingCard';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';

const EMPTY_MESSAGES = {
  followers:
    'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.',
  following:
    'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.',
};

const pickOwnRecipesCount = (item) =>
  item?.recipesCount ??
  item?.ownRecipes ??
  item?.recipesTotal ??
  item?.addedRecipesCount ??
  undefined;

export const UserList = ({ variant = 'followers' }) => {
  const { page, setPage, query } = useUserList(variant);
  const { mutate: follow, isPending: isFollowPending, variables: followTarget } = useFollowUser();
  const {
    mutate: unfollow,
    isPending: isUnfollowPending,
    variables: unfollowTarget,
  } = useUnfollowUser();
  useToastOnError(query.isError, query.error, `Failed to load ${variant}`);

  const totalPages = query.data?.totalPages ?? 1;
  const list = query?.data?.data ?? [];
  const isLoading = query.isLoading;
  const isEmpty = !isLoading && list.length === 0;

  const handleToggleFollow = (userId, currentlyFollowed) => {
    if (currentlyFollowed) {
      unfollow(userId);
    } else {
      follow(userId);
    }
  };

  return (
    <div className="tablet:gap-8 flex flex-col gap-6">
      {isLoading && (
        <ul className="tablet:gap-5 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <FollowingCardSkeleton />
            </li>
          ))}
        </ul>
      )}

      {isEmpty && (
        <p className="tablet:pt-[60px] desktop:pt-[100px] text-grey tablet:text-main tablet:w-[610px] mx-auto pt-[48px] text-center text-sm font-medium">
          {EMPTY_MESSAGES[variant]}
        </p>
      )}

      {!isLoading && list.length > 0 && (
        <ul className="flex flex-col">
          {list.map((item, index) => {
            const { id, name, avatarURL, recipeImageUrls, isFollowing: isFollowed } = item;
            const isToggling =
              (isFollowPending && followTarget === id) ||
              (isUnfollowPending && unfollowTarget === id);
            const isLast = index === list.length - 1;
            return (
              <li key={id}>
                <FollowingCard
                  id={id}
                  name={name}
                  avatarURL={avatarURL}
                  recipeURLs={recipeImageUrls}
                  ownRecipesCount={pickOwnRecipesCount(item)}
                  isFollowed={isFollowed}
                  onToggleFollow={handleToggleFollow}
                  isToggling={isToggling}
                />
                {!isLast && (
                  <hr className="border-grey tablet:mt-[40px] tablet:mb-[40px] mt-[20px] mb-[20px] w-full border-0 border-t" />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {!isEmpty && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
};

export default UserList;
