import { cn } from '@/shared/lib/clsx';
import { Button } from '@/shared/ui/Button';

export const CategoryCard = ({
  title,
  imageUrl,
  imageMobileUrl,
  imageDesktopUrl,
  className = '',
  href,
}) => {
  const fallback = imageDesktopUrl ?? imageMobileUrl ?? imageUrl ?? null;

  return (
    <div
      className={cn(
        'tablet:h-92.25 relative flex h-62.5 w-full items-end overflow-hidden rounded-[1.875rem]',
        className
      )}
    >
      <div className="absolute inset-0 z-1">
        {fallback ? (
          <picture>
            {imageDesktopUrl ? (
              <source media="(min-width: 768px)" srcSet={imageDesktopUrl} />
            ) : null}
            {imageMobileUrl ? <source media="(max-width: 767px)" srcSet={imageMobileUrl} /> : null}
            <img src={fallback} alt={title} className="h-full w-full object-cover" loading="lazy" />
          </picture>
        ) : null}
      </div>
      <div className="bg-main/20 absolute inset-0 z-2"></div>

      <div className="tablet:p-6 relative z-3 flex gap-1 p-4">
        <div className="tablet:px-3.5 tablet:py-2.5 shadow-border-white tablet:shadow-border-grey/20 rounded-[1.875rem] bg-white/20 px-3 py-2">
          <p className="tablet:text-xl tablet:leading-[1.2] text-base font-bold text-white">
            {title}
          </p>
        </div>

        <Button
          variant="icon"
          className="tablet:w-11 tablet:h-11 shadow-border-grey/20 h-10 w-10 text-white"
          iconName="arrow-up-right-icon"
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
          href={href}
          iconVisualHiddenText={`Link to ${title} category`}
        />
      </div>
    </div>
  );
};
