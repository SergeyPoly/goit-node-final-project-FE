import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/shared/ui/Button.jsx';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-[343px] rounded-[20px] bg-white px-8 py-14 md:max-w-[560px] md:rounded-[30px] md:p-20">
        <Button
          type="button"
          variant="modal-icon"
          onClick={onClose}
          className="absolute top-5 right-5"
          iconName="x-icon"
          iconClass="w-6 h-6"
          iconVisualHiddenText="Close Modal"
        />

        {children}
      </div>
    </div>,
    modalRoot
  );
};
