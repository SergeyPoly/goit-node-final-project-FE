import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';
import { cn } from '@/shared/lib/clsx';
import { useState } from 'react';

const THUMB_COUNT_TABLET = 3;
const THUMB_COUNT_DESKTOP = 4;
const AVATAR_PLACEHOLDER = '/images/placeholder/No-Image-Placeholder-small.webp';

export const FollowingCardSkeleton = () => (
  <div>
    <div className="flex flex-row items-start justify-between gap-18.75">
      <div className="flex flex-row gap-4">
        <Skeleton variant="circle" className="size-21.25" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-11 w-29 rounded-[30px]" />
        </div>
      </div>
      <div className="tablet:flex hidden flex-row gap-3">
        {Array.from({ length: THUMB_COUNT_DESKTOP }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('size-25 rounded-lg', i >= THUMB_COUNT_TABLET && 'desktop:block hidden')}
          />
        ))}
      </div>
      <Skeleton variant="circle" className="size-10.5" />
    </div>
  </div>
);

export const FollowingCard = ({
  id,
  name,
  avatarURL,
  recipeURLs,
  ownRecipesCount,
  isFollowed = false,
  onToggleFollow,
  isToggling = false,
}) => {
  const [avatarError, setAvatarError] = useState(false);
  const avatarSrc = avatarError || !avatarURL ? AVATAR_PLACEHOLDER : avatarURL;
  const hasRecipes = recipeURLs && recipeURLs.length > 0;

  return (
    <div>
      <div className="desktop:gap-15.25 flex justify-between gap-11.5">
        <div className="flex h-25 w-60 shrink-0 flex-row gap-4">
          <img
            className="size-21.25 shrink-0 rounded-full object-cover"
            src={avatarSrc}
            alt={name}
            onError={() => setAvatarError(true)}
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="min-w-0">
              <h2
                className={cn(
                  'm-0 block h-6 truncate',
                  'cursor-default font-sans text-[20px] leading-6 font-extrabold tracking-[-0.02em] text-[#050505] uppercase'
                )}
                title={name}
              >
                {name}
              </h2>
              <p className="tablet:leading-5 m-0 truncate font-sans text-[14px] leading-4.5 font-medium tracking-[-0.02em] text-[#BFBEBE]">
                Own recipes: {ownRecipesCount}
              </p>
            </div>

            {onToggleFollow && (
              <Button
                variant="primary"
                onClick={() => onToggleFollow(id, isFollowed)}
                disabled={isToggling}
                className="w-full"
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        </div>

        {hasRecipes && (
          <div className="tablet:block hidden grow">
            <ul className="flex gap-3">
              {recipeURLs.slice(0, THUMB_COUNT_DESKTOP).map((url, i) => (
                <li key={i} className={cn(i >= THUMB_COUNT_TABLET && 'desktop:list-item hidden')}>
                  <img className="size-25 rounded-lg object-cover" src={url} alt="" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to={`/user/${id}`}
          className="text-main shadow-border-grey hover:bg-main tablet:size-10.5 flex size-9 shrink-0 items-center justify-center gap-2.5 rounded-[30px] p-3 transition-colors hover:text-white hover:shadow-none"
          aria-label={`View ${name}'s profile`}
        >
          <Icon name="arrow-up-right-icon" className="size-4.5 text-inherit" />
        </Link>
      </div>
    </div>
  );
};
