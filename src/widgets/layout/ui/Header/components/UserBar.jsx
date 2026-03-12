import { Link } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { useState } from 'react';
import { ToggledWindow } from './ToogleWindow';
import clsx from 'clsx';

export const UserBar = ({ user, path }) => {
  const { logout } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <div className='flex items-center bg-[var(--color-dark)] rounded-2xl pr-[7px]'>
        <div className="h-8 w-8 rounded-full bg-gray-200 mr-1" />
        <Link to={`/user/${user?.id}`} className="font-bold text-[var(--color-grey)] mobile:text-xs mr-[6px] uppercase">
          {user?.name || 'My Profile'}
        </Link>
        <button
          onClick={() => setIsOpen((prev) => !prev)}><svg className={clsx("text-[var(--color-white)] w-4 h-4", isOpen ? "rotate-180" : "rotate-0")}>
            <use href={`/icons.svg#chevron-down-icon`}></use>
          </svg></button>
        <ToggledWindow isOpen={isOpen} logout={logout}></ToggledWindow>
      </div>

      <button className={clsx(path ? "text-[var(--color-white)]" : "text-[var(--color-dark)]", "tablet:hidden")}>
        <svg className="w-7 h-7" >
          <use href="/icons.svg#menu-icon"></use>
        </svg>
      </button>
    </div>

  );
};
