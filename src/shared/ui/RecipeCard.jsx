import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';

export const RecipeCard = ({
  title,
  imageMobileUrl,
  imageDesktopUrl,
  description = '',
  owner = {},
}) => {
  const { isMobile } = useBreakpoint();
  const [favorite, setFavorite] = useState(false);
  const [isImgError, setIsImgError] = useState(false);

  const placeholderMob = '/images/placeholder/No-Image-Placeholder-mob.webp';
  const placeholderDesk = '/images/placeholder/No-Image-Placeholder-desk.webp';

  const ownerName = owner?.name ?? 'Owner';
  const ownerLink = `/user/${owner?.id}`;

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  const imageBlock = (
    <picture>
      {!isImgError && (
        <>
          {imageDesktopUrl && <source media="(min-width: 768px)" srcSet={imageDesktopUrl} />}
          {imageMobileUrl && <source media="(max-width: 767px)" srcSet={imageMobileUrl} />}
        </>
      )}
      <img
        src={
          isImgError
            ? isMobile
              ? placeholderMob
              : placeholderDesk
            : (imageMobileUrl ?? imageDesktopUrl)
        }
        alt={title}
        onError={() => setIsImgError(true)}
        className="tablet:h-68.75 tablet:rounded-[1.875rem] h-57.5 w-full overflow-hidden rounded-[1.25rem] object-cover"
        loading="lazy"
      />
    </picture>
  );

  const avatarSrc = owner?.avatarURL ?? null;

  return (
    <article className="flex h-full w-full flex-col gap-4">
      {imageBlock}

      <div className="tablet:gap-3.5 flex h-full flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h4 className="h4 line-clamp-1 text-ellipsis">{title}</h4>
          <p className="main-text line-clamp-2 text-ellipsis">{description}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="tablet:w-10 tablet:h-10 bg-grey block h-8 w-8 overflow-hidden rounded-full">
              <img
                src={avatarSrc ?? '/images/placeholder/No-Image-Placeholder-small.webp'}
                alt={ownerName}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <Link to={ownerLink} className="tablet:text-base text-dark text-sm font-bold">
              {ownerName}
            </Link>
          </div>

          <div className="flex gap-1">
            <Button
              variant="icon"
              iconName="heart-icon"
              iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
              isActive={favorite}
              onClick={toggleFavorite}
              iconVisualHiddenText="Add to Favorites"
            />

            <Button
              variant="icon"
              iconName="arrow-up-right-icon"
              iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
              iconVisualHiddenText={`Open ${title} recipe`}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
