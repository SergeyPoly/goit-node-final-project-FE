import { useState, useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/clsx';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

const VARIANTS = {
  recipe: 'w-full h-79.5 tablet:h-100 rounded-[1.875rem]',
  profile: 'w-20 tablet:w-30 h-20 tablet:h-30 rounded-full',
};

const getDashSVG = (color = '%23BFBEBE') => {
  const svg = `<svg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='${color}' stroke-width='2' stroke-dasharray='5%2c 5' stroke-linecap='butt'/%3e%3c/svg%3e`;
  return `url("data:image/svg+xml,${svg.replace(/#/g, '%23')}")`;
};

export const ImageManager = ({ variant = 'recipe', image = null, onChange, readOnly = false }) => {
  const [preview, setPreview] = useState(image);
  const fileInputRef = useRef(null);

  const effectiveReadOnly = readOnly || !onChange;
  const isProfile = variant === 'profile';

  useEffect(() => {
    setPreview(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (preview && typeof preview === 'string' && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    if (effectiveReadOnly) return;
    const file = e.target.files?.[0];

    if (file) {
      if (preview && typeof preview === 'string' && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange?.(file);
    }
  };

  const ContainerTag = effectiveReadOnly ? 'div' : 'label';

  const triggerInput = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('tablet:gap-5 flex flex-col items-center gap-4', isProfile && 'relative')}>
      <ContainerTag
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          VARIANTS[variant],
          !effectiveReadOnly && 'cursor-pointer',
          !preview &&
            !isProfile &&
            !effectiveReadOnly &&
            "before:pointer-events-none before:absolute before:inset-0 before:bg-(image:--dash-bg) before:content-['']"
        )}
        style={!isProfile ? { '--dash-bg': getDashSVG() } : {}}
      >
        {!effectiveReadOnly && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="sr-only"
          />
        )}

        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          !isProfile && (
            <div className="tablet:gap-4 flex flex-col items-center justify-center gap-2">
              <Icon
                name="photo-frame-icon"
                className="tablet:w-16 tablet:h-16 text-dark/20 h-12.5 w-12.5"
              />
              <span className="text-main tablet:text-base text-sm font-medium underline">
                Upload a photo
              </span>
            </div>
          )
        )}
      </ContainerTag>

      {preview && !isProfile && !effectiveReadOnly && (
        <Button type="button" variant="text" onClick={triggerInput} className="underline">
          Upload another photo
        </Button>
      )}

      {isProfile && !effectiveReadOnly && (
        <Button
          variant="icon"
          className="tablet:w-9.5 tablet:h-9.5 tablet:-bottom-3 absolute -bottom-2.5 z-10 h-7 w-7"
          iconName="plus-icon"
          iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
          isActive
          onClick={triggerInput}
          iconVisualHiddenText="Change profile picture"
        />
      )}
    </div>
  );
};