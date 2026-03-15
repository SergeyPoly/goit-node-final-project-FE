import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { Button } from '@/shared/ui/Button.jsx';

export const AuthBar = () => {
  const { setCurrentModal } = useModalStore();

  return (
    <div className="flex rounded-[30px] bg-white">
      <Button onClick={() => setCurrentModal(MODAL_NAMES.LOGIN)}>Sign in</Button>
      <Button onClick={() => setCurrentModal(MODAL_NAMES.REGISTER)}>Sign up</Button>
    </div>
  );
};
