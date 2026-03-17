# Project State

## Changelog
- **2024-XX-XX** (Current): Developed `RecipeDetails` component (`src/pages/recipe/ui/RecipeDetails.jsx`) and updated `RecipePage.jsx` to render the full detailed view.
  - Implemented two-column responsive layout based on Figma specifications.
  - Added ingredients grid with pictures and measures mapping.
  - Displayed tags, recipe preparation instructions, and interactive author profile.
  - Added primary 'ADD TO FAVORITES' / 'REMOVE FROM FAVORITES' button with authentication gating logic.
- **2024-XX-XX** (Previous): Updated `RecipePage` component (`src/pages/recipe/ui/RecipePage.jsx`) to fetch and render the `RecipeCard`.
  - Added `getRecipe` API endpoint to `src/entities/recipe/api/recipes.js`.
  - Created React Query hook `useRecipe(id)`.
  - Loaded dynamic recipe title into PathInfo.
- **2024-XX-XX** (Previous): Updated `RecipeCard` component (`src/shared/ui/RecipeCard.jsx`) according to Figma FSD architectural requirements.
  - Formatted author profile block as an explicit button.
  - Connected `isFavorite` and `authorLink` interaction to `SignInModal` via `useModalStore` and `useCurrentUser` context (if unauthorized).
  - Configured local routing via `useNavigate` for Author and Recipe page redirections.
