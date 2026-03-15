import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ items }) => {
  return (
    <nav className="container px-4 tablet:px-8 desktop:px-5 py-4">
      <ul className="flex items-center gap-2 text-xs uppercase text-dark/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-dark">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-dark transition">
                  {item.label}
                </Link>
              )}

              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};