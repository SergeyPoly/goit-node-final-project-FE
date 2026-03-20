import { Button } from '@/shared/ui/Button';
import { Subtitle } from './Subtitle';

export const RecipePreview = ({ id, img, title, description = '', onRemove, canRemove = true }) => {
  const showRemoveButton = canRemove && typeof onRemove === 'function';

  return (
    <article className="tablet:gap-4 flex w-full flex-row gap-2.5">
      <img
        className="tablet:size-25 size-18.75 flex-none rounded-[15px] object-cover"
        src={img}
        alt={title}
      />
      <div className="tablet:gap-8 flex w-full flex-row justify-between gap-4">
        <div className="tablet:gap-2.5 desktop:max-w-152.5 flex w-fit flex-col gap-2">
          <h4 className="tablet:text-xl line-clamp-1 text-base font-extrabold uppercase">
            {title}
          </h4>
          <Subtitle className="tablet:text-base tablet:text-(--text-secondary-dark) line-clamp-2 text-sm leading-6 font-medium text-(--text-secondary)">
            {description}
          </Subtitle>
        </div>
        <div className="flex w-fit flex-row justify-end gap-1">
          <Button
            href={'/recipe/' + id}
            iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
            iconName="arrow-up-right-icon"
            iconVisualHiddenText="Link to Category"
            variant="icon"
          />
          {showRemoveButton && (
            <Button
              iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
              iconName="trash-icon"
              iconVisualHiddenText="Delete item"
              variant="icon"
              onClick={() => onRemove(id)}
            />
          )}
        </div>
      </div>
    </article>
  );
};
