import { useModalStore } from '@/entities/modal/store/use-modal-store.js';
import { Button } from '@/shared/ui/Button.jsx';
import { useLogoutUser } from '@/entities/user/api/index.js';

export const LogoutConfirmationModal = () => {
  const { closeCurrentModal } = useModalStore();

  const { isPending, logout } = useLogoutUser({
    onSuccess: closeCurrentModal,
  });

  return (
    <>
      <h2 className="text-dark mb-5 text-center text-2xl font-extrabold uppercase md:text-3xl lg:text-[32px]">
        Are you logging out?
      </h2>
      <p className="mb-10 text-center">You can always log back in at any time.</p>

      <Button
        variant="dark"
        className="bg-main hover:bg-dark mb-5 w-full disabled:cursor-default!"
        disabled={isPending}
        onClick={logout}
      >
        {isPending ? 'Logging out...' : 'Log out'}
      </Button>

      <Button
        variant="default"
        className="border-main w-full border text-base hover:opacity-70"
        disabled={isPending}
        onClick={closeCurrentModal}
      >
        Cancel
      </Button>
    </>
  );
};
