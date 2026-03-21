import { Modal } from '@/shared/ui/Modal';
import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { LoginModal } from './modals/login';
import { RegisterModal } from './modals/register';
import { MobileMenuModal } from '@/features/mobile-menu';
import { LogoutConfirmationModal } from './modals/logout-confirmation';

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
