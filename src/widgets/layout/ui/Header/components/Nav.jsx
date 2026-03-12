import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Nav = ({ isDarkType = true }) => {
  const buttonStyle = clsx(
    "box-border font-bold text-xs uppercase p-[14px] rounded-3xl border border-transparent transition-all duration-200",
    isDarkType ? "hover:border-[var(--color-white)]/20" : "hover:border-[var(--color-grey)]",
    isDarkType ? "text-[var(--color-white)]" : "text-[var(--color-main)]"
  );

  return (
    <nav className={clsx("font-medium gap-1 mobile:hidden tablet:flex desktop:gap-10")}>
      <Link title="Home" to="/" className={`${buttonStyle}`}>
        Home
      </Link>
      <Link title="Add Recipe" to="/recipe/add" className={buttonStyle}>
        Add Recipe
      </Link>
    </nav>
  );
};