import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export const RecipeCard = ({
    title,
    imageUrl,
    imageMobileUrl,
    imageDesktopUrl,
    description = '',
    owner = {},
    href,
}) => {
    const [favorite, setFavorite] = useState(false);

    const fallback = imageDesktopUrl ?? imageMobileUrl ?? imageUrl ?? null;
    const ownerName = owner?.name || "Owner";
    const ownerLink = `/user/${owner?.id}`;

    const toggleFavorite = () => {
        setFavorite(prev => !prev);
    };

    const imageBlock = fallback && (
        <picture>
            {imageDesktopUrl && (
                <source media="(min-width: 768px)" srcSet={imageDesktopUrl} />
            )}

            {imageMobileUrl && (
                <source media="(max-width: 767px)" srcSet={imageMobileUrl} />
            )}

            <img
                src={fallback}
                alt={title}
                className="mb-2 h-56 tablet:69 w-full object-cover overflow-hidden rounded-[1.875rem]"
                loading="lazy"
            />
        </picture>
    );

    return (
        <div className='w-87 tablet:76'>
            <div className='mb-4'>
                {imageBlock}
                <p className='uppercase font-extrabold text-lg tablet:text-xl mb-2'>
                    {title}
                </p>
                <p className='font-base text-sm line-clamp-2 text-ellipsis h-10'>
                    {description}
                </p>
            </div>

            <div className='flex justify-between'>

                <div className='flex items-center gap-2'>
                    <div className="block h-8 w-8 rounded-full bg-black">
                        {owner.avatar && (
                            <img
                                src={owner.avatar}
                                alt={title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <Link
                        to={ownerLink}
                        className="mobile:text-xs mr-[6px] font-bold text-black uppercase"
                    >
                        {ownerName}
                    </Link>
                </div>

                <div className='flex gap-1'>
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
                        className="tablet:w-11 tablet:h-11 shadow-border-grey h-9 w-9 text-black"
                        iconName="arrow-up-right-icon"
                        iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
                        href={href}
                    />
                </div>
            </div>

        </div>
    );
};


