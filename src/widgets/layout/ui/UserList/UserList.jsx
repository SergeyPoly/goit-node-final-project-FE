import { useMemo } from 'react';
import { useUserList } from '@/queries/user/use-user-list';
import { useFollowUser } from '@/queries/user/use-follow-user';
import { useUnfollowUser } from '@/queries/user/use-unfollow-user';
import { useCurrentUser } from '@/queries/user/use-current-user';
import { Pagination } from '@/shared/ui/Pagination';
import { FollowingCard, FollowingCardSkeleton } from '@/shared/ui/FollowingCard';
import { useToastOnError } from '@/shared/lib/hooks/use-toast-on-error';

const EMPTY_MESSAGES = {
  followers: 'People who follow you...',
  following: 'People you follow...',
};

const pickOwnRecipesCount = (item) =>
  item?.recipesCount ??
  item?.ownRecipes ??
  item?.recipesTotal ??
  item?.addedRecipesCount ??
  undefined;

export const UserList = ({ variant = 'followers' }) => {
  const { page, setPage, query } = useUserList(variant);
  const { user } = useCurrentUser();
  const { mutate: follow, isPending: isFollowPending, variables: followTarget } = useFollowUser();
  const {
    mutate: unfollow,
    isPending: isUnfollowPending,
    variables: unfollowTarget,
  } = useUnfollowUser();
  useToastOnError(query.isError, query.error, `Failed to load ${variant}`);

  const followingIds = useMemo(
    () =>
      new Set(user?.following?.map((u) => (typeof u === 'string' ? u : (u?.id ?? u?._id))) ?? []),
    [user?.following]
  );

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

  const getIsFollowed = (id) => (variant === 'following' ? true : followingIds.has(id));

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
        <p className="text-grey text-center text-base font-medium">{EMPTY_MESSAGES[variant]}</p>
      )}

      {!isLoading && list.length > 0 && (
        <ul className="tablet:gap-5 flex flex-col gap-4">
          {list.map((item) => {
            const { id, name, avatarURL, recipeImageUrls } = item;
            const isFollowed = getIsFollowed(id);
            const isToggling =
              (isFollowPending && followTarget === id) ||
              (isUnfollowPending && unfollowTarget === id);
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
