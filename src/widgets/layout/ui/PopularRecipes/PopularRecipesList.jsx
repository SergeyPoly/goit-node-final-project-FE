import { RecipeCard } from '@/shared/ui/RecipeCard';

export const PopularRecipesList = ({ popularRecipes = [] }) => {
    return (<ul className="gap-9 tablet:gap-y-10 tablet:gap-x-5 flex flex-col gap-5 flex-row flex-wrap">
        {
            popularRecipes.map(recipe => {
                const {
                    id,
                    title,
                    thumb,
                    imageMobileUrl,
                    imageDesktopUrl,
                    description = '',
                    owner = {},
                    href,
                } = recipe;
                return (
                    <li id={id}>
                        <RecipeCard title={title} imageUrl={thumb}
                            imageMobileUrl={imageMobileUrl} imageDesktopUrl={imageDesktopUrl}
                            description={description}
                            owner={owner}
                            href={href}
                        />
                    </li>
                )

            })
        }
    </ul>)
}