import { cn } from '@/shared/lib/clsx';

export const Icon = ({ 
  name, 
  className = '', 
  visualHiddenText = '',
  ...props 
}) => {
  return (
    <>
      <svg 
        className={cn('shrink-0', className)} 
        aria-hidden={!visualHiddenText}
        role={visualHiddenText ? 'img' : 'presentation'}
        {...props}
      >
        <use href={`/icons.svg#${name}`}></use>
      </svg>
      {visualHiddenText && <span className="sr-only">{visualHiddenText}</span>}
    </>
  );
};