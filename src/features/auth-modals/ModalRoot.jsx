import { Modal } from '@/shared/ui/Modal.jsx';
import { MODAL_NAMES, useModalStore } from '@/entities/modal/index.js';
import { LoginModal } from './modals/login/index.jsx';
import { RegisterModal } from './modals/register/index.jsx';
import { MobileMenuModal } from '@/features/mobile-menu/index.js';
import { LogoutConfirmationModal } from './modals/logout-confirmation/index.jsx';

const MODAL_COMPONENTS = {
  [MODAL_NAMES.LOGIN]: LoginModal,
  [MODAL_NAMES.REGISTER]: RegisterModal,
  [MODAL_NAMES.MOBILE_MENU]: MobileMenuModal,
  [MODAL_NAMES.LOGOUT_CONFIRMATION]: LogoutConfirmationModal,
};

export const ModalRoot = () => {
  const { currentModal, closeCurrentModal } = useModalStore();

  const ModalComponent = MODAL_COMPONENTS[currentModal?.name];

  return (
    <Modal isOpen={!!currentModal} onClose={closeCurrentModal} name={currentModal?.name}>
      {ModalComponent && <ModalComponent />}
    </Modal>
  );
};
