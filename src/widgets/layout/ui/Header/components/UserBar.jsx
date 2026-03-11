import { Link } from 'react-router-dom';
import { useUserStore } from '@/entities/user/model/use-user-store.js';
import { useState } from 'react';


export const UserBar = ({ user, path }) => {
  const { logout } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <div className='flex items-center bg-[var(--color-dark)] rounded-2xl pr-[7px]'>
        <div className="h-8 w-8 rounded-full bg-gray-200 mr-1" />
        <Link to={`/user/${user?.id}`} className="font-bold text-[var(--color-white)] mobile:text-xs mr-[6px] uppercase">
          {user?.name || 'My Profile'}
        </Link>
        <button
          onClick={() => setIsOpen((prev) => !prev)}><svg className="text-[var(--color-white)] w-4 h-4">
            <use href={`/icons.svg#chevron-down-icon`}></use>
          </svg></button>
      </div>

      {isOpen && (
        <div className="absolute flex flex-col gap-1 p-4 right-0 top-[34px] mt-2 w-30 rounded-xl border-[var(--color-grey)] bg-[var(--color-dark)] ">
          <button className="text-xs w-full text-sm font-medium text-white uppercase font-bold text-left">
            Profile
          </button>
          <button className="flex gap-[2px] text-xs w-full text-sm font-medium text-white uppercase font-bold text-left" onClick={() => logout()}>
            Log out
            <svg className="text-[var(--color-white)] w-4 h-4">
              <use href="/icons.svg#arrow-up-right-icon"></use>
            </svg>
          </button></div>)}
      <button className={`${path ? "text-[var(--color-white)]" : "text-[var(--color-dark)]"} tablet:hidden`}>
        <svg className={` w-7 h-7`} >
          <use href="/icons.svg#menu-icon"></use>
        </svg>
      </button>
    </div>

  );
};
