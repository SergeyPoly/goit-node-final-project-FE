import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/shared/ui/Button.jsx';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ isOpen, onClose, children }) {
  const handleEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, handleEsc]);

  if (!isOpen || !modalRoot) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          relative
          w-full max-w-[343px] md:max-w-[560px]
          rounded-5 md:rounded-[30px]
          bg-white
          px-8 py-14 md:p-20
        "
      >
        <Button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <svg width="24" height="24">
            <use href="/icons.svg#x-icon" />
          </svg>
        </Button>

        {children}
      </div>
    </div>,
    modalRoot
  );
}