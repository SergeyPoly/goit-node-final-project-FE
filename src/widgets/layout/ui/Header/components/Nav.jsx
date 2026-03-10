import { Link } from 'react-router-dom';

export const Nav = () => (
  <nav className="flex gap-6 font-medium">
    <Link title="Home" to="/" className="hover:text-orange-600">
      Home
    </Link>
    <Link title="Add Recipe" to="/recipe/add" className="hover:text-orange-600">
      Add Recipe
    </Link>
  </nav>
);
