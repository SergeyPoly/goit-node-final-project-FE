import { useId, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/clsx';

export const TextField = ({
  value = '',
  onChange,
  placeholder,
  maxLength,
  multiline = false,
  error = false,
  name = '',
  required = false,
  className = '',
  ...props
}) => {
  const id = useId();
  const textareaRef = useRef(null);
  const Tag = multiline ? 'textarea' : 'input';
  const valueLength = value.length;

  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange?.(newValue);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div
        className={cn(
          'focus-within:border-main relative flex w-full items-end border-b pb-4 transition-colors duration-300',
          error ? 'border-error' : 'border-grey'
        )}
      >
        <Tag
          ref={multiline ? textareaRef : null}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={multiline ? 1 : undefined}
          className={cn(
            'tablet:text-base text-grey placeholder:text-grey w-full bg-transparent pr-18 text-sm font-medium outline-none',
            multiline && 'tablet:pr-25 resize-none overflow-hidden pr-22',
            valueLength > 0 && 'text-main',
            error && 'text-error'
          )}
          {...props}
        />

        {maxLength && (
          <div
            className={cn(
              'tablet:text-base text-grey absolute top-0 right-0 text-sm font-medium transition-colors select-none',
              error && 'text-error! [&_span]:text-error!'
            )}
          >
            <span className={cn(valueLength > 0 && 'text-main')}>{valueLength}</span>
            <span className={cn(valueLength === maxLength && 'text-main')}>/</span>
            <span className={cn(valueLength === maxLength && 'text-main')}>{maxLength}</span>
          </div>
        )}
      </div>
    </div>
  );
};
