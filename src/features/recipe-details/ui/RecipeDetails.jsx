import { Button } from '@/shared/ui/Button.jsx';
import { useModalStore } from '@/entities/modal/store/use-modal-store.js';
import { MODAL_NAMES } from '@/entities/modal/constants.js';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@/queries/user/use-current-user.js';
import { IngredientChip } from '@/shared/ui/IngredientChip.jsx';

export const RecipeDetails = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  isToggleFavoriteDisabled,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useCurrentUser();
  const { setCurrentModal } = useModalStore();

  if (!recipe) return null;

  const {
    id,
    title,
    description,
    time,
    category,
    preview,
    thumb,
    owner,
    ingredients,
    instructions,
  } = recipe;

  const imageUrl = preview ?? thumb ?? '/images/placeholder/No-Image-Placeholder-desk.webp';

  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      setCurrentModal(MODAL_NAMES.LOGIN);
    } else if (owner?.id) {
      navigate(`/user/${owner.id}`);
    }
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setCurrentModal(MODAL_NAMES.LOGIN);
    } else {
      onToggleFavorite(id, isFavorite);
    }
  };

  return (
    <article className="desktop:flex-row desktop:gap-20 flex flex-col items-start gap-8">
      {/* Left Column: Image */}
      <div className="desktop:w-[48%] w-full shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="tablet:rounded-[1.875rem] desktop:rounded-[2.5rem] aspect-4/3 h-auto w-full rounded-[1.25rem] object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Column: Content */}
      <div className="desktop:flex-1 flex w-full flex-col gap-8">
        {/* Header Block */}
        <div className="flex flex-col gap-4">
          <h1 className="h2 leading-tight">{title}</h1>
          <div className="flex gap-2">
            {category && (
              <span className="border-main/20 text-main/50 rounded-full border px-4 py-1.5 text-sm font-medium">
                {category}
              </span>
            )}
            {time && (
              <span className="border-main/20 text-main/50 rounded-full border px-4 py-1.5 text-sm font-medium">
                {time} min
              </span>
            )}
          </div>
          <p className="main-text !font-normal">{description}</p>
        </div>

        {/* Author Block */}
        {owner && (
          <button
            type="button"
            onClick={handleAuthorClick}
            className="flex w-fit items-center gap-4 text-left transition-opacity hover:opacity-80"
          >
            <div className="bg-grey h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <img
                src={owner.avatarURL ?? '/images/placeholder/No-Image-Placeholder-small.webp'}
                alt={owner.name ?? 'Author'}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-main/50 text-xs">Created by:</span>
              <span className="text-dark text-sm leading-tight font-bold">
                {owner.name ?? 'Guest'}
              </span>
            </div>
          </button>
        )}

        {/* Ingredients Block */}
        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="h4 uppercase">Ingredients</h2>
            <ul className="tablet:gap-x-8 grid grid-cols-2 gap-x-4 gap-y-4">
              {ingredients.map((ing) => (
                <IngredientChip
                  key={ing.id}
                  name={ing.name}
                  measure={ing.recipe_ingredients?.measure}
                  image={ing.img}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Instructions Block */}
        {instructions && (
          <div className="flex flex-col gap-6">
            <h2 className="h4 uppercase">Recipe Preparation</h2>
            <div className="main-text text-dark !text-base leading-relaxed !font-normal whitespace-pre-wrap">
              {instructions}
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <div className="desktop:pt-8 pt-4 uppercase">
          <Button
            variant="favorite"
            isActive={isFavorite}
            onClick={handleFavoriteClick}
            disabled={isToggleFavoriteDisabled}
            className="tablet:w-auto w-full"
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </div>
      </div>
    </article>
  );
};
