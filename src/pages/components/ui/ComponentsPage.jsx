import { Button } from "@/shared/ui/Button";
import Modal from '@/shared/ui/modal/Modal.jsx';
import { useState } from 'react';

export const ComponentsPage = () => {
  const isFavorite = true;
  const [isOpen, setIsOpen] = useState(false);

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
      <Button variant="dark" onClick={() => setIsOpen(true)}>MODAL</Button>
      <Button variant="dark" className="w-full" type="submit" disabled>Sign in</Button>
      <Button variant="dark" className="w-full" type="submit">Sign in</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>test content</p>
        <p>test content</p>
        <p>test content</p>
        <p>test content</p>
      </Modal>
    </div>
  );
};
