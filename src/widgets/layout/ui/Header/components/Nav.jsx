import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx';

const baseStyle =
  'box-border font-bold text-xs uppercase p-[14px] rounded-[1.875rem] border transition-all duration-300';

export const Nav = ({ isDarkType = true }) => {
  const getNavLinkStyle = ({ isActive }) =>
    cn(
      baseStyle,
      isDarkType ? 'text-white' : 'text-gray-900',
      isActive ? (isDarkType ? 'border-white' : 'border-gray-900') : 'border-transparent',
      !isActive && (isDarkType ? 'hover:border-white/20' : 'hover:border-gray-300')
    );

  return (
    <nav className="tablet:flex tablet:gap-4 desktop:gap-10 hidden font-medium">
      <NavLink to="/" className={getNavLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/recipe/add" className={getNavLinkStyle}>
        Add Recipe
      </NavLink>
    </nav>
  );
};
