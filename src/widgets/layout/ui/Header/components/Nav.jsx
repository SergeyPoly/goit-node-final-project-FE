import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Nav = ({ className = "" }) => {
  const buttonStyle = clsx(
    "box-border font-bold text-xs uppercase text-[var(--color-white)] p-[14px] rounded-3xl border-2 border-transparent transition-all duration-200",
    "hover:border-[var(--color-white)]/20"
  );

  return (
    <nav className={clsx("font-medium border gap-10", className)}>
      <Link title="Home" to="/" className={`${buttonStyle}`}>
        Home
      </Link>
      <Link title="Add Recipe" to="/recipe/add" className={buttonStyle}>
        Add Recipe
      </Link>
    </nav>
  );
};