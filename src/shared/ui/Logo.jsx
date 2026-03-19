import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Logo = ({ isDarkType = true }) => (
  <Link
    to="/"
    className={clsx(
      'text-xl font-extrabold tracking-tight md:text-2xl',
      isDarkType ? 'text-main' : 'text-white'
    )}
  >
    foodies
  </Link>
);
