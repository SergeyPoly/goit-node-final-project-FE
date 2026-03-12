import clsx from 'clsx';

export const Logo = ({ isDarkType = true }) => (
  <a
    href="/"
    className={clsx(
      'text-xl font-extrabold tracking-tight md:text-2xl',
      isDarkType ? 'text-[var(--color-main)]' : 'text-[var(--color-white)]'
    )}
  >
    foodies
  </a>
);
