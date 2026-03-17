import { Button } from '@/shared/ui/Button';
import { useModalStore } from '@/entities/modal/store/use-modal-store';
import { MODAL_NAMES } from '@/entities/modal/constants';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@/queries/user/use-current-user';
import { IngredientItem } from './IngredientItem';

export const RecipeDetails = ({ recipe, isFavorite, onToggleFavorite, isToggleFavoriteDisabled }) => {
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
    <article className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
      {/* Left Column: Image */}
      <div className="w-full lg:w-[48%] shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto aspect-4/3 object-cover rounded-[1.25rem] tablet:rounded-[1.875rem] lg:rounded-[2.5rem]"
          loading="lazy"
        />
      </div>

      {/* Right Column: Content */}
      <div className="flex flex-col gap-8 w-full lg:flex-1">
        {/* Header Block */}
        <div className="flex flex-col gap-4">
          <h1 className="h2 leading-tight">{title}</h1>
          <div className="flex gap-2">
            {category && (
              <span className="px-4 py-1.5 border border-main/20 rounded-full text-sm font-medium text-main/50">
                {category}
              </span>
            )}
            {time && (
              <span className="px-4 py-1.5 border border-main/20 rounded-full text-sm font-medium text-main/50">
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
            className="flex items-center gap-4 text-left hover:opacity-80 transition-opacity w-fit"
          >
            <div className="w-11 h-11 bg-grey rounded-full overflow-hidden shrink-0">
              <img
                src={owner.avatarURL ?? '/images/placeholder/No-Image-Placeholder-small.webp'}
                alt={owner.name ?? 'Author'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-main/50">Created by:</span>
              <span className="text-sm font-bold text-dark leading-tight">{owner.name ?? 'Guest'}</span>
            </div>
          </button>
        )}

        {/* Ingredients Block */}
        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="h4 uppercase">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-x-4 tablet:gap-x-8 gap-y-4">
              {ingredients.map((ing) => (
                <IngredientItem
                  key={ing.id}
                  name={ing.name}
                  img={ing.img}
                  measure={ing.recipe_ingredients?.measure}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Instructions Block */}
        {instructions && (
          <div className="flex flex-col gap-6">
            <h2 className="h4 uppercase">Recipe Preparation</h2>
            <div className="main-text whitespace-pre-wrap !text-base !font-normal leading-relaxed text-dark">
              {instructions}
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <div className="pt-4 lg:pt-8 uppercase">
          <Button
            variant="favorite"
            isActive={isFavorite}
            onClick={handleFavoriteClick}
            disabled={isToggleFavoriteDisabled}
            className="w-full tablet:w-auto"
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </div>
      </div>
    </article>
  );
};
