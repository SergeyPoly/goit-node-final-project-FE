import { Outlet } from 'react-router-dom';
import { ModalRoot } from '@/components/ModalRoot';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const SharedLayout = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <Header />
      <main className="flex grow flex-col bg-white">
        <Outlet />
      </main>
      <Footer />
      <ModalRoot />
    </div>
  );
};
