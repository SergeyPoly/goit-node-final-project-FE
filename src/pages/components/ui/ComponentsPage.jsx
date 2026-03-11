import { Button } from "@/shared/ui/Button";

export const ComponentsPage = () => {
  const isFavorite = true;

  return (
    <div className="p-4">
      <div className="flex gap-4 flex-wrap items-center">
        <h2 className="text-lg font-bold">Buttons</h2>

        <Button>Sign in</Button>
        
        <Button isActive>Sign up</Button>

        <Button variant="favorite" isActive={isFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>

        <Button
          variant="icon"
          iconName="heart-icon"
          iconClass="w-4 md:w-4.5 h-4 md:h-4.5"
          isActive={false}
          iconVisualHiddenText="Add to Favorites"
        />

        <Button
          variant="icon"
          iconName="heart-icon"
          iconClass="w-4 md:w-4.5 h-4 md:h-4.5"
          isActive
          iconVisualHiddenText="Remove from Favorites"
        />

        <Button
          variant="icon"
          iconName="facebook-icon"
          iconClass="w-5 h-5"
          external
          href="https://facebook.com"
          iconVisualHiddenText="Share on Facebook"
        />

        <Button
          variant="icon"
          iconName="arrow-up-right-icon"
          iconClass="w-4 md:w-4.5 h-4 md:h-4.5"
          href="/category"
          iconVisualHiddenText="Link to Category"
        />

        <Button
          variant="icon"
          iconName="trash-icon"
          iconClass="w-4 md:w-4.5 h-4 md:h-4.5"
          iconVisualHiddenText="Delete item"
        />

        <Button variant="dark">Publish</Button>

        <Button variant="dark-hover">Add recipe</Button>

        <div className="w-full flex flex-col gap-2">
          <Button variant="dark" className="w-full" type="submit" disabled>
            Sign in
          </Button>
          <Button variant="dark" className="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};