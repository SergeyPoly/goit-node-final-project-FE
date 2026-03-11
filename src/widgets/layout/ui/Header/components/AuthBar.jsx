import { useUserStore } from '@/entities/user/model/use-user-store.js';
import clsx from 'clsx';

export const AuthBar = () => {
  const { setUser } = useUserStore();

  const buttonStyles = clsx("box-border rounded-[30px] py-[10px] px-4 text-xs font-bold border uppercase",
    "hover:bg-[var(--color-dark)] hover:text-[var(--color-white)] hover:border-[var(--color-white)]",
    "bg-[var(--color-white)] text-[var(--color-dark)] border-transparent",
    "tablet:py-[14px] tablet:px-[30px]"
    )

  return (
    <div className="flex bg-[var(--color-white)] rounded-[30px] ">
      <button
        onClick={setUser}
        className={buttonStyles}
      >
        Sign in
      </button>

      <button
        className={buttonStyles}
      >
        Sign up
      </button>

    </div>
  );
};