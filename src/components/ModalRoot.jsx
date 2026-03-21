import { Modal } from '@/shared/ui/Modal';
import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { LoginModal } from './modals/login';
import { RegisterModal } from './modals/register';
import { MobileMenuModal } from '@/features/mobile-menu';

const MODAL_COMPONENTS = {
  [MODAL_NAMES.LOGIN]: LoginModal,
  [MODAL_NAMES.REGISTER]: RegisterModal,
  [MODAL_NAMES.MOBILE_MENU]: MobileMenuModal,
};

export const ModalRoot = () => {
  const { currentModal, closeCurrentModal } = useModalStore();

  const ModalComponent = MODAL_COMPONENTS[currentModal?.name];
  const variant = currentModal?.name === MODAL_NAMES.MOBILE_MENU ? 'mobile-menu' : 'default';

  return (
    <Modal isOpen={!!currentModal} onClose={closeCurrentModal} variant={variant}>
      {ModalComponent && <ModalComponent />}
    </Modal>
  );
};
