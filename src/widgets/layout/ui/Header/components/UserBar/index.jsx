import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PROFILE_CLASSNAME, UserDropdown } from './UserDropdown';
import { cn } from '@/shared/lib/clsx';
import { classNames } from './classNames';

export const UserBar = ({ user, isDark }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <div className="relative">
        <button
          className={cn(PROFILE_CLASSNAME, classNames.container)}
          onClick={() => setDropdownVisible((prev) => !prev)}
        >
          <div className={classNames.avatarWrapper}>
            {user.avatarURL ? <img src={user?.avatarURL} alt="avatar" /> : null}
          </div>
          <span className={classNames.name}>{user.name}</span>
          <svg
            className={cn(
              'pointer-events-none h-4 w-4 text-white transition-transform',
              dropdownVisible ? 'rotate-180' : 'rotate-0'
            )}
          >
            <use href="/icons.svg#chevron-down-icon" />
          </svg>
        </button>

        {dropdownVisible && (
          <UserDropdown onClose={() => setDropdownVisible(false)} userId={user?.id} />
        )}
      </div>

      <button className={cn(isDark ? 'text-white' : 'text-dark', 'tablet:hidden')}>
        <svg className="h-7 w-7">
          <use href="/icons.svg#menu-icon" />
        </svg>
      </button>
    </div>
  );
};
