import { Logo } from '@/shared/ui/Logo.jsx';
import { NetworkLinks } from '@/shared/ui/NetworkLinks.jsx';
import { Copyright } from '@/shared/ui/Copyright.jsx';

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-12">
      <div className="container mx-auto flex items-center justify-between px-4 border-be pb-[40px] md:pb-[46px] border-b-(--color-grey)">
        <Logo/>
        <NetworkLinks/>
      </div>
      <Copyright />
    </footer>
  );
};
