import { Link } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { useState } from 'react';
import { ToggledWindow } from './ToogleWindow';
import clsx from 'clsx';

// TODO total refactoring needed
export const UserBar = ({ user, path }) => {
  const { logout } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <div className="flex items-center rounded-2xl bg-[var(--color-dark)] pr-[7px]">
        <div className="mr-1 h-8 w-8 rounded-full bg-gray-200" />
        <Link
          to={`/user/${user?.id}`}
          className="mobile:text-xs mr-[6px] font-bold text-[var(--color-grey)] uppercase"
        >
          {user?.name || 'My Profile'}
        </Link>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <svg
            className={clsx(
              'h-4 w-4 text-[var(--color-white)]',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
          >
            <use href={`/icons.svg#chevron-down-icon`}></use>
          </svg>
        </button>
        <ToggledWindow isOpen={isOpen} logout={logout}></ToggledWindow>
      </div>

      <button
        className={clsx(
          path ? 'text-[var(--color-white)]' : 'text-[var(--color-dark)]',
          'tablet:hidden'
        )}
      >
        <svg className="h-7 w-7">
          <use href="/icons.svg#menu-icon"></use>
        </svg>
      </button>
    </div>
  );
};
