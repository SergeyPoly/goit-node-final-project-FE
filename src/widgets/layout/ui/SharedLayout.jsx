import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header.jsx';
import { Footer } from './Footer/Footer.jsx';

export const SharedLayout = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <Header />
      <main className="mobile:bg-amber-300 tablet:bg-amber-700 desktop:bg-gray-300 container grow bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
