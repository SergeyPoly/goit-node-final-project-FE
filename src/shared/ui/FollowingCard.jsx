import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';
import { cn } from '@/shared/lib/clsx';
import { useState } from 'react';

const THUMB_COUNT_TABLET = 3;
const THUMB_COUNT_DESKTOP = 4;
const AVATAR_PLACEHOLDER = '/images/placeholder/No-Image-Placeholder-small.webp';
const RECIPE_PLACEHOLDER = '/images/placeholder/No-Image-Placeholder-mob.webp';

export const FollowingCardSkeleton = () => (
  <div>
    <div className="flex flex-row items-start justify-between gap-[75px]">
      <div className="flex flex-row gap-4">
        <Skeleton variant="circle" className="size-[85px]" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-[44px] w-[116px] rounded-[30px]" />
        </div>
      </div>
      <div className="tablet:flex hidden flex-row gap-3">
        {Array.from({ length: THUMB_COUNT_DESKTOP }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              'size-[100px] rounded-lg',
              i >= THUMB_COUNT_TABLET && 'desktop:block hidden'
            )}
          />
        ))}
      </div>
      <Skeleton variant="circle" className="size-[42px]" />
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
      <div className="desktop:gap-[61px] flex justify-between gap-[46px]">
        <div className="flex h-[100px] w-[240px] shrink-0 flex-row gap-4">
          <img
            className="size-[85px] shrink-0 rounded-full object-cover"
            src={avatarSrc}
            alt={name}
            onError={() => setAvatarError(true)}
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="min-w-0">
              <h2
                className={cn(
                  'm-0 block h-6 truncate',
                  'font-sans text-[20px] leading-6 font-extrabold tracking-[-0.02em] text-[#050505] uppercase'
                )}
                title={name}
              >
                {name}
              </h2>
              <p className="tablet:leading-[20px] m-0 truncate font-sans text-[14px] leading-[18px] font-medium tracking-[-0.02em] text-[#BFBEBE]">
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
        <div className="tablet:block hidden flex-grow">
          <ul className="flex gap-3">
            {(hasRecipes
              ? recipeURLs.slice(0, THUMB_COUNT_DESKTOP)
              : Array.from({ length: THUMB_COUNT_DESKTOP }, () => null)
            ).map((url, i) => (
              <li key={i} className={cn(i >= THUMB_COUNT_TABLET && 'desktop:list-item hidden')}>
                <img
                  className="size-[100px] rounded-lg object-cover"
                  src={url || RECIPE_PLACEHOLDER}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.src = RECIPE_PLACEHOLDER;
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <Link
          to={`/user/${id}`}
          className="text-main shadow-border-grey hover:bg-main tablet:size-[42px] flex size-[36px] shrink-0 items-center justify-center gap-2.5 rounded-[30px] p-3 transition-colors hover:text-white hover:shadow-none"
          aria-label={`View ${name}'s profile`}
        >
          <Icon name="arrow-up-right-icon" className="size-[18px] text-inherit" />
        </Link>
      </div>
    </div>
  );
};
