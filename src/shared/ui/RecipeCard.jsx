import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint';
import { useCurrentUser } from '@/queries/user/use-current-user';
import { useModalStore } from '@/entities/modal/store/use-modal-store';
import { MODAL_NAMES } from '@/entities/modal/constants';

export const RecipeCard = ({
  id,
  title,
  imageMobileUrl,
  imageDesktopUrl,
  description = '',
  owner = {},
  isFavorite = false,
  onToggleFavorite,
  isToggleFavoriteDisabled = false,
}) => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser();
  const { setCurrentModal } = useModalStore();

  const [isImgError, setIsImgError] = useState(false);

  const placeholderMob = '/images/placeholder/No-Image-Placeholder-mob.webp';
  const placeholderDesk = '/images/placeholder/No-Image-Placeholder-desk.webp';

  const safeTitle = title || 'Recipe';

  const ownerName = owner?.name ?? 'Owner';
  const ownerId = owner?.id;
  const ownerLink = ownerId ? `/user/${ownerId}` : null;
  const recipeLink = id ? `/recipe/${id}` : null;

  const handleOwnerClick = () => {
    if (!isAuthenticated) {
      setCurrentModal(MODAL_NAMES.LOGIN);
    } else if (ownerLink) {
      navigate(ownerLink);
    }
  };

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      setCurrentModal(MODAL_NAMES.LOGIN);
      return;
    }
    if (!id) return;
    onToggleFavorite?.(id, isFavorite);
  };

  const handleArrowClick = () => {
    if (recipeLink) {
      navigate(recipeLink);
    }
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
        alt={safeTitle}
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
          <h4 className="h4 line-clamp-1 text-ellipsis">{safeTitle}</h4>
          <p className="main-text line-clamp-2 text-ellipsis">{description}</p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleOwnerClick}
            className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
          >
            <div className="tablet:w-10 tablet:h-10 bg-grey block h-8 w-8 overflow-hidden rounded-full">
              <img
                src={avatarSrc ?? '/images/placeholder/No-Image-Placeholder-small.webp'}
                alt={ownerName}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <span className="tablet:text-base text-dark text-sm font-bold">{ownerName}</span>
          </button>

          <div className="flex gap-1">
            <Button
              variant="icon"
              iconName="heart-icon"
              iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
              isActive={isFavorite}
              onClick={toggleFavorite}
              disabled={isToggleFavoriteDisabled || !id}
              iconVisualHiddenText={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            />

            <Button
              type="button"
              variant="icon"
              iconName="arrow-up-right-icon"
              iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
              onClick={handleArrowClick}
              disabled={!recipeLink}
              iconVisualHiddenText={`Open ${safeTitle} recipe`}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

