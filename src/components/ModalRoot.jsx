import { Modal } from '@/shared/ui/Modal';
import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { LoginModal } from './modals/login';
import { RegisterModal } from './modals/register';

const MODAL_COMPONENTS = {
  [MODAL_NAMES.LOGIN]: LoginModal,
  [MODAL_NAMES.REGISTER]: RegisterModal,
};

export const ModalRoot = () => {
  const { currentModal, closeCurrentModal } = useModalStore();

  const ModalComponent = MODAL_COMPONENTS[currentModal?.name];

  return (
    <Modal isOpen={!!currentModal} onClose={closeCurrentModal}>
      {ModalComponent && <ModalComponent />}
    </Modal>
  );
};
