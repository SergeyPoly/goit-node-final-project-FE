import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx';
import { useModalStore } from '@/entities/modal';
import { Logo } from '@/shared/ui/Logo';
import { Icon } from '@/shared/ui/Icon';
import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint';

const linkBase =
  'w-full p-3.5 text-sm font-bold rounded-[1.875rem] text-white uppercase text-center';

export const MobileMenuModal = () => {
  const { closeCurrentModal } = useModalStore();
  const { isTablet, isDesktop } = useBreakpoint();
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (isTablet || isDesktop) closeCurrentModal();
  }, [isTablet, isDesktop, closeCurrentModal]);

  const getLinkClass = ({ isActive }) =>
    cn(linkBase, isActive ? 'shadow-border-white' : 'shadow-none');

  return (
    <div className="relative container flex h-full flex-col items-center justify-center p-6 text-white">
      <div className="flex w-full items-center justify-between py-0.5">
        <Logo isDarkType={false} />

        <button type="button" onClick={closeCurrentModal} aria-label="Close menu">
          <Icon name="x-icon" className="h-7 w-7 text-white" visualHiddenText="Close menu" />
        </button>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-32">
        <nav className="flex w-fit flex-col items-center justify-center gap-6">
          <NavLink
            to="/"
            onClick={closeCurrentModal}
            className={({ isActive }) => cn(getLinkClass({ isActive }))}
          >
            Home
          </NavLink>

          <NavLink to="/recipe/add" className={getLinkClass} onClick={closeCurrentModal}>
            Add Recipe
          </NavLink>
        </nav>

        <div className="mr-1.25 flex w-full justify-center gap-5.5">
          <img
            src="/images/hero/hero-small-mob.webp"
            srcSet="/images/hero/hero-small-mob.webp 1x, /images/hero/hero-small-mob@2x.webp 2x"
            alt="Small dessert plate"
            loading="lazy"
            className="mt-20.25 h-17.5 w-19.25 rotate-11 rounded-[0.9375rem] object-cover"
          />

          <img
            src="/images/hero/hero-main-mob.webp"
            srcSet="/images/hero/hero-main-mob.webp 1x, /images/hero/hero-main-mob@2x.webp 2x"
            alt="Main meat dish"
            loading="lazy"
            className="w-47.5 -rotate-12 rounded-[1.875rem] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
