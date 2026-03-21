import { Link } from 'react-router-dom';
import { MODAL_NAMES, useModalStore } from '@/entities/modal';
import { cn } from '@/shared/lib/clsx';
import { useClosableElement } from '@/shared/lib/hooks/dom';
import { Button } from '@/shared/ui/Button';

export const PROFILE_CLASSNAME = 'headerDropdown';
const PROFILE_LINK_CLASS_NAME = 'profileLink';

const whiteListClassNames = [PROFILE_CLASSNAME];
const closableChildrenClassNames = [PROFILE_LINK_CLASS_NAME];

export const UserDropdown = ({ userId, onClose }) => {
  const { setCurrentModal } = useModalStore();

  const ref = useClosableElement({
    onClose,
    visible: true,
    name: 'headerDropdown',
    whiteListClassNames,
    closableChildrenClassNames,
  });

  const showLogoutConfirmation = () => setCurrentModal(MODAL_NAMES.LOGOUT_CONFIRMATION);

  return (
    <div
      ref={ref}
      className="border-dark absolute right-0 bottom-[-11px] z-10 mt-2 flex w-30 translate-y-full flex-col gap-1 rounded-[15px] border bg-black p-4"
    >
      <Link
        to={`/user/${userId}`}
        className={cn(
          PROFILE_LINK_CLASS_NAME,
          'text-xs font-bold text-white uppercase hover:underline'
        )}
      >
        Profile
      </Link>
      <button
        className="flex w-full gap-[2px] text-xs font-bold text-white uppercase hover:underline disabled:pointer-events-none disabled:opacity-60"
        onClick={showLogoutConfirmation}
      >
        Log out
        <svg className="h-4 w-4 text-white">
          <use href="/icons.svg#arrow-up-right-icon" />
        </svg>
      </button>
    </div>
  );
};
