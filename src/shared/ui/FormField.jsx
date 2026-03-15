import { useState } from 'react';
import { cn } from '@/shared/lib/clsx';

export const FormField = ({
  type = 'text',
  className,
  containerClassName,
  iconClass,
  error,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  const fieldStyles = cn(
    'w-full p-3.5 tablet:px-4.5 tablet:py-4 text-dark placeholder-shown:shadow-border-grey shadow-border-main placeholder:text-dark text-sm tablet:text-base outline-none font-medium rounded-[1.875rem] mask-stars',
    isPassword && 'pr-10 tablet:pr-11',
    !!error && 'border-1 border-red-600',
    className
  );
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      <div className={isPassword ? 'relative' : ''}>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={fieldStyles}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="tablet:right-4.5 absolute top-1/2 right-3.5 -translate-y-1/2"
          >
            <svg className={cn(iconClass, 'text-inherit')}>
              <use href={`/icons.svg#${showPassword ? 'eye-icon' : 'eye-slash-icon'}`}></use>
            </svg>
          </button>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};
