import React, { useEffect, useRef, useState } from 'react';

const fallbackAvatar = (name = 'user') =>
  `https://i.pravatar.cc/150?u=${encodeURIComponent(String(name || 'user'))}`;

export const ProfileCard = (props) => {
  const {
    isOwnProfile = false,
    name = 'User',
    email = '',
    avatarUrl,
    recipesCount = 0,
    favoritesCount = 0,
    followersCount = 0,
    followingCount = 0,
    onUploadAvatar,
  } = props || {};

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (jpg, png, webp, gif)');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    onUploadAvatar?.(file);

    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="mx-auto flex w-[394px] rotate-0 flex-col gap-[20px] overflow-hidden rounded-[30px] border border-[1px] border-gray-300 pt-[40px] pr-[80px] pb-[40px] pl-[80px] opacity-100 shadow-xl">
      <div className="relative mt-6 inline-flex justify-center md:mt-8">
        <img
          src={avatarUrl ?? fallbackAvatar(name)}
          alt={name}
          className="h-28 w-28 rounded-full object-cover ring-1 ring-gray-200 ring-offset-2 md:h-32 md:w-32"
        />
        {isOwnProfile && (
          <div
            className="absolute -right-[14px] -bottom-[14px] z-10 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-md transition-transform duration-150 hover:scale-105 hover:bg-gray-950 md:-right-[-90px] md:-bottom-[18px] md:min-h-[48px] md:min-w-[48px]"
            role="button"
            tabIndex={0}
            aria-label="Upload new avatar"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <span className="text-[1.75rem] leading-none font-extrabold md:text-3xl">+</span>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      <h3 className="mt-6 text-center text-[20px] leading-[24px] font-extrabold tracking-[-0.02em] text-gray-900 uppercase">
        {String(name).toUpperCase()}
      </h3>

      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center gap-1">
          <p className="text-[14px] leading-[20px] font-medium tracking-[-0.028em] text-gray-600">
            Email:
          </p>
          <p className="ml-1 text-[16px] leading-[24px] font-bold tracking-[-0.032em] text-gray-900">
            {email}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-[14px] leading-[20px] font-medium tracking-[-0.028em] text-gray-600">
            Added recipes:
          </p>
          <p className="ml-1 text-[16px] leading-[24px] font-bold tracking-[-0.032em] text-gray-900">
            {recipesCount}
          </p>
        </div>

        {isOwnProfile && (
          <div className="flex items-center gap-1">
            <p className="text-[14px] leading-[20px] font-medium tracking-[-0.028em] text-gray-600">
              Favorites:
            </p>
            <p className="ml-1 text-[16px] leading-[24px] font-bold tracking-[-0.032em] text-gray-900">
              {favoritesCount}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1">
          <p className="text-[14px] leading-[20px] font-medium tracking-[-0.028em] text-gray-600">
            Followers:
          </p>
          <p className="ml-1 text-[16px] leading-[24px] font-bold tracking-[-0.032em] text-gray-900">
            {followersCount}
          </p>
        </div>

        {isOwnProfile && (
          <div className="flex items-center gap-1">
            <p className="text-[14px] leading-[20px] font-medium tracking-[-0.028em] text-gray-600">
              Following:
            </p>
            <p className="ml-1 text-[16px] leading-[24px] font-bold tracking-[-0.032em] text-gray-900">
              {followingCount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
