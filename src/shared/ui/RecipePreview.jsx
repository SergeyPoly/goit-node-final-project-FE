import { Button } from '@/shared/ui/Button';
import { Subtitle } from './Subtitle';

export const RecipePreview = ({
  id,
  img,
  title = 'Lorem ipsum dolor sit amet.',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, voluptatibus.',
  onRemove,
}) => {

  return (
    <article className="flex w-full flex-row gap-[10px] tablet:gap-4">
      <img className="size-[75px] rounded-[15px] flex-none object-cover tablet:size-[100px]" src={img} alt={title} />
      <div className="flex flex-row gap-4 tablet:gap-8">
        <div className="flex flex-col w-[166px] gap-2 tablet:gap-[10px] tablet:w-[468px] desktop:w-[610px]">
          <h4 className="line-clamp-1 text-base font-extrabold uppercase tablet:text-xl">{title}</h4>
          <Subtitle className="line-clamp-2 text-sm font-medium text-(--text-secondary) leading-6 tablet:text-base tablet:text-(--text-secondary-dark)">
            {description}
          </Subtitle>
        </div>
        <div className="flex flex-row gap-1">
          <Button
            href={"/recipe/" + id}
            iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
            iconName="arrow-up-right-icon"
            iconVisualHiddenText="Link to Category"
            variant="icon"
          />
          <Button
            iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
            iconName="trash-icon"
            iconVisualHiddenText="Delete item"
            variant="icon"
            onClick={() => onRemove(id)}
          />
        </div>
      </div>
    </article>
  );
};
