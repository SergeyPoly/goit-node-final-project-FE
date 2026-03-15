import { useModalStore } from '../use-modal-store';

export const useCurrentModal = () => useModalStore((state) => state.currentModal);
