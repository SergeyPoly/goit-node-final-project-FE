import { cn } from '@/shared/lib/clsx';
import { Icon } from '@/shared/ui/Icon';

/**
 * Універсальний компонент інгредієнта.
 * Використовується для відображення та при створенні рецептів (додавання/видалення).
 *
 * @param {string} name - Назва інгредієнта
 * @param {string} measure - Кількість/міра (напр. "400 g")
 * @param {string} [image] - URL зображення (опціонально)
 * @param {Function} [onRemove] - Callback видалення. Якщо передано — показується іконка хрестика
 * @param {string} [className] - Додаткові класи
 */
export const IngredientChip = ({ name, measure, image, onRemove, className = '' }) => {
  const showRemoveButton = typeof onRemove === 'function';

  return (
    <div
      className={cn('flex min-w-0 items-center gap-2.5', showRemoveButton && 'pr-0', className)}
      data-testid="ingredient-chip"
    >
      {/* Секція зображення — Figma: 75×75, rounded-15, border grey */}
      <div className="border-grey flex h-[75px] w-[75px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] border">
        {image ? (
          <img src={image} alt={name} className="h-[55px] w-[55px] object-cover" loading="lazy" />
        ) : (
          <Icon name="photo-frame-icon" className="text-grey h-8 w-8" aria-hidden />
        )}
      </div>

      {/* Текстова секція — Figma: gap 2, name + measure */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-main truncate text-sm font-medium">{name}</span>
        <span className="text-grey truncate text-sm">{measure}</span>
      </div>

      {/* Опціональна кнопка видалення — Figma: 16×16 */}
      <div className="h-full">
        {showRemoveButton && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="focus-visible:ring-main -m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={`Видалити інгредієнт ${name}`}
          >
            <Icon name="x-icon" className="text-main h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
