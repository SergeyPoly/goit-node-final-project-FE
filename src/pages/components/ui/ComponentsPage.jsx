import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';

export const ComponentsPage = () => {
  const isFavorite = true;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-lg font-bold">Buttons</h2>

        <Button>Sign in</Button>

        <Button isActive>Sign up</Button>

        <Button variant="favorite" isActive={isFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>

        <Button
          variant="icon"
          iconName="heart-icon"
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
          isActive={false}
          iconVisualHiddenText="Add to Favorites"
        />

        <Button
          variant="icon"
          iconName="heart-icon"
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
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
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
          href="/category"
          iconVisualHiddenText="Link to Category"
        />

        <Button
          variant="icon"
          iconName="trash-icon"
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
          iconVisualHiddenText="Delete item"
        />

        <Button variant="dark">Publish</Button>
        <Button variant="dark" onClick={() => setIsOpen(true)}>MODAL</Button>
        <Button variant="dark-hover">Add recipe</Button>

        <div className="flex w-full flex-col gap-2">
          <Button variant="dark" className="w-full" type="submit" disabled>
            Sign in
          </Button>
          <Button variant="dark" className="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>test content</p>
        <p>test content</p>
        <p>test content</p>
        <p>test content</p>
      </Modal>
    </div>
  );
};
