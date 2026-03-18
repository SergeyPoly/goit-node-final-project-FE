import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const Nav = ({ isDarkType = true }) => {
  const baseStyle =
    'box-border font-bold text-xs uppercase p-[14px] rounded-3xl border transition-all duration-200';

  const getNavLinkStyle = ({ isActive }) =>
    clsx(
      baseStyle,
      isDarkType ? 'text-white' : 'text-gray-900',
      isActive ? (isDarkType ? 'border-white' : 'border-gray-900') : 'border-transparent',
      !isActive && (isDarkType ? 'hover:border-white/20' : 'hover:border-gray-300')
    );

  return (
    <nav className="tablet:flex desktop:gap-10 hidden font-medium">
      <NavLink to="/" className={getNavLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/recipe/add" className={getNavLinkStyle}>
        Add Recipe
      </NavLink>
    </nav>
  );
};
