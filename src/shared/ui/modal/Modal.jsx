import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ isOpen, onClose, children }) {
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
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          relative
          h-[408px] w-[343px]
          rounded-[20px]
          bg-white
          px-[30px] pb-[60px] pt-[60px]
          md:h-[500px] md:w-[560px]
          md:rounded-[30px]
          md:p-[80px]
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute right-[20px] top-[20px]
            md:right-[20px] md:top-[20px]
          "
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/icons.svg#x-icon" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  );
}