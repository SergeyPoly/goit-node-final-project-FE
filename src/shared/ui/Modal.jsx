import { createPortal } from 'react-dom';
import { Button } from '@/shared/ui/Button.jsx';
import { useClosableElement } from '../lib/hooks/dom';
import { MODAL_NAMES } from '@/entities/modal';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ isOpen, onClose, children, name }) => {
  const visible = isOpen && modalRoot;

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const containerRef = useClosableElement({
    onClose,
    name,
    visible,
    closeOnClickOutside: false,
  });

  if (!visible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (name === MODAL_NAMES.MOBILE_MENU) {
    return createPortal(
      <div ref={containerRef} onClick={handleBackdropClick} className="fixed inset-0 z-50">
        <div className="bg-main relative h-full w-full">{children}</div>
      </div>,
      modalRoot
    );
  }

  return createPortal(
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-85.75 rounded-[20px] bg-white px-8 py-14 md:max-w-140 md:rounded-[30px] md:p-20">
        <Button
          type="button"
          variant="modal-icon"
          onClick={onClose}
          className="absolute top-5 right-5 hover:opacity-70"
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
