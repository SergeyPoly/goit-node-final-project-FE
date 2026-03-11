import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header.jsx';
import { Footer } from './Footer/Footer.jsx';

export const SharedLayout = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <Header />
      <main className="grow bg-white co">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
