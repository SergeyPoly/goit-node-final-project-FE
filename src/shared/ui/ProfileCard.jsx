import { ImageManager } from '@/shared/ui/ImageManager';
import { cn } from '@/shared/lib/clsx';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

const measureTextPx = (() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  return (text, font) => {
    if (!ctx) return 0;
    ctx.font = font;
    return ctx.measureText(text).width;
  };
})();

const clampEmailToWidth = (email, maxWidthPx, font) => {
  if (!email || typeof email !== 'string') return '';
  if (!maxWidthPx || maxWidthPx <= 0) return email;

  const atIndex = email.indexOf('@');
  if (atIndex === -1) return email;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (!domain) return email;

  const full = `${local}@${domain}`;
  if (measureTextPx(full, font) <= maxWidthPx) return full;

  const tail = `…@${domain}`;
  if (measureTextPx(tail, font) >= maxWidthPx) return tail;

  let lo = 0;
  let hi = local.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const candidate = `${local.slice(0, mid)}${tail}`;
    if (measureTextPx(candidate, font) <= maxWidthPx) lo = mid;
    else hi = mid - 1;
  }

  return `${local.slice(0, lo)}${tail}`;
};

const ProfileStatRow = ({ label, value, title, valueClassName, valueRef }) => (
  <div className="flex w-full min-w-0 items-center gap-2">
    <p className="text-grey tablet:text-sm tablet:leading-[1.285714] flex shrink-0 text-xs leading-normal font-medium">
      {label}
    </p>
    <p
      ref={valueRef}
      className={cn('main-text min-w-0 flex-1 font-bold', valueClassName)}
      title={title ?? value}
    >
      {value}
    </p>
  </div>
);

export const ProfileCard = (props) => {
  const {
    isOwnProfile = false,
    name = 'User',
    email = '',
    avatarURL,
    recipesCount = 0,
    favoritesCount = 0,
    followersCount = 0,
    followingCount = 0,
    onUploadAvatar,
  } = props || {};

  const emailValueRef = useRef(null);
  const [emailMetrics, setEmailMetrics] = useState({ maxWidth: 0, font: '' });

  useLayoutEffect(() => {
    const el = emailValueRef.current;
    if (!el) return;

    const update = () => {
      const cs = window.getComputedStyle(el);
      const font = cs.font || `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const maxWidth = el.getBoundingClientRect().width;
      setEmailMetrics((prev) =>
        prev.maxWidth === maxWidth && prev.font === font ? prev : { maxWidth, font }
      );
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const displayedEmail = useMemo(
    () => clampEmailToWidth(email, emailMetrics.maxWidth, emailMetrics.font),
    [email, emailMetrics.maxWidth, emailMetrics.font]
  );

  return (
    <div className="tablet:gap-5 border-grey tablet:px-20 tablet:py-10 mx-auto flex w-full flex-col items-center gap-4 rounded-[1.875rem] border px-13.5 py-7.5">
      <ImageManager
        variant="profile"
        image={avatarURL}
        onChange={isOwnProfile ? onUploadAvatar : undefined}
      />

      <h3 className="h3 tablet:text-[1.25rem] tablet:leading-[1.2] cursor-default text-center">
        {name}
      </h3>

      <div className="tablet:min-w-58.5 flex w-full min-w-51.25 flex-col gap-1.5">
        <ProfileStatRow
          label="Email:"
          value={displayedEmail}
          title={email}
          valueRef={emailValueRef}
        />
        <ProfileStatRow label="Added recipes:" value={recipesCount} />

        {isOwnProfile && <ProfileStatRow label="Favorites:" value={favoritesCount} />}

        <ProfileStatRow label="Followers:" value={followersCount} />

        {isOwnProfile && <ProfileStatRow label="Following:" value={followingCount} />}
      </div>
    </div>
  );
};
