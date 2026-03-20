import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { cn } from '@/shared/lib/clsx';
import { Button } from '@/shared/ui/Button.jsx';

const btnClassName =
  'text-xs border tablet:px-[26px] tablet:py-[12px] tablet:text-xs leading-normal';

export const AuthBar = () => {
  const { setCurrentModal } = useModalStore();

  return (
    <div className="flex rounded-[30px] bg-white">
      <Button
        className={cn(
          btnClassName,
          'peer hover:bg-dark hover:shadow-border-dark border-white hover:text-white'
        )}
        onClick={() => setCurrentModal(MODAL_NAMES.LOGIN)}
      >
        Sign in
      </Button>
      <Button
        variant="dark"
        className={cn(
          btnClassName,
          'border-grey peer-hover:text-dark peer-hover:shadow-border-white border peer-hover:border-white peer-hover:bg-white'
        )}
        onClick={() => setCurrentModal(MODAL_NAMES.REGISTER)}
      >
        Sign up
      </Button>
    </div>
  );
};
