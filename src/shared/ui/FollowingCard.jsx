import { Button } from './Button';
import { Icon } from './Icon';
import { Skeleton } from './Skeleton';
import { cn } from '@/shared/lib/clsx';
import { useState } from 'react';

const THUMB_COUNT = 4;
const AVATAR_PLACEHOLDER = '/images/placeholder/No-Image-Placeholder-small.webp';
const RECIPE_PLACEHOLDER = '/images/placeholder/No-Image-Placeholder-mob.webp';

const RecipeThumb = ({ src }) => {
  const [error, setError] = useState(false);
  return (
    <li>
      <img
        className="size-[100px] rounded-lg object-cover"
        src={error || !src ? RECIPE_PLACEHOLDER : src}
        alt=""
        onError={() => setError(true)}
      />
    </li>
  );
};

export const FollowingCardSkeleton = () => (
  <div className="flex flex-col gap-[40px]">
    <div className="flex flex-row items-center justify-between gap-[75px]">
      <div className="flex flex-row gap-4">
        <Skeleton variant="circle" className="size-[85px]" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-[44px] w-[116px] rounded-[30px]" />
        </div>
      </div>
      <div className="flex flex-row gap-3">
        {Array.from({ length: THUMB_COUNT }).map((_, i) => (
          <Skeleton key={i} className="size-[100px] rounded-lg" />
        ))}
      </div>
      <Skeleton variant="circle" className="size-[42px]" />
    </div>
    <hr className="border-grey my-4 w-full border-0 border-t" />
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
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-row items-start justify-between gap-[75px]">
        <div className="flex flex-row gap-4">
          <img
            className="size-[85px] shrink-0 rounded-full object-cover"
            src={avatarSrc}
            alt={name}
            onError={() => setAvatarError(true)}
          />
          <div className="flex flex-col">
            <h2
              className={cn(
                'm-0 min-w-0',
                'flex h-6 items-center',
                'font-sans text-[20px] leading-[24px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-[#050505] uppercase'
              )}
            >
              {name}
            </h2>
            <p className="m-0 font-sans text-[14px] leading-[20px] font-medium tracking-[-0.02em] whitespace-nowrap text-[#BFBEBE]">
              Own recipes: {ownRecipesCount}
            </p>
            {onToggleFollow && (
              <Button
                variant="primary"
                onClick={() => onToggleFollow(id, isFollowed)}
                disabled={isToggling}
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        </div>
        <div>
          <ul className="flex flex-row gap-3">
            {hasRecipes
              ? recipeURLs.map((recipeURL, index) => <RecipeThumb key={index} src={recipeURL} />)
              : Array.from({ length: THUMB_COUNT }).map((_, i) => (
                  <li key={i}>
                    <img
                      className="size-[100px] rounded-lg object-cover"
                      src={RECIPE_PLACEHOLDER}
                      alt=""
                    />
                  </li>
                ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => onToggleFollow?.(id, isFollowed)}
          disabled={isToggling}
          className="text-main shadow-border-grey hover:bg-main flex size-[42px] shrink-0 items-center justify-center gap-2.5 rounded-[30px] p-3 transition-colors hover:text-white hover:shadow-none disabled:pointer-events-none disabled:opacity-50"
          aria-label={isFollowed ? 'Unfollow' : 'View profile'}
        >
          <Icon name="arrow-up-right-icon" className="size-[18px] text-inherit" />
        </button>
      </div>

      <hr className="border-grey my-4 w-full border-0 border-t" />
    </div>
  );
};
