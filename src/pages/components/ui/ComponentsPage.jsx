import { Button } from "@/shared/ui/Button";
import { FormField } from "../../../shared/ui/FormField";

export const ComponentsPage = () => {
  const isFavorite = true;

  return (
    <div className="flex flex-col gap-2">
      <Button>Sign in</Button>
      <Button isActive>Sign up</Button>

      <Button variant="favorite" isActive={isFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>

      <Button
        variant="icon"
        iconName="heart-icon"
        iconClass="w-4 md:w-5 h-4 md:h-5"
        isActive={false}
      />

      <Button
        variant="icon"
        iconName="heart-icon"
        iconClass="w-4 md:w-5 h-4 md:h-5"
        isActive
      />

      <Button
        variant="icon"
        iconName="facebook-icon"
        iconClass="w-5 h-5"
        href="https://facebook.com"
      />

      <Button variant="dark">Publish</Button>

      <Button variant="dark-hover">Add recipe</Button>

      <Button variant="dark" className="w-full" type="submit" disabled>Sign in</Button>
      <Button variant="dark" className="w-full" type="submit">Sign in</Button>
      
      <FormField placeholder={"name*"}
        iconClass="w-5 h-5"
        type="password"></FormField>
      
      <FormField placeholder={"name*"}
        iconClass="w-5 h-5"></FormField>
    </div>
  );
};
