import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/clsx';

const VARIANTS = {
  default:
    'w-fit px-4 tablet:px-7 py-2.5 tablet:py-3.5 text-xs font-bold rounded-[1.875rem] uppercase',
  favorite:
    'w-fit px-4 tablet:px-7 py-2.5 tablet:py-3.5 text-sm tablet:text-base font-bold rounded-[1.875rem] shadow-border-grey uppercase',
  dark: 'w-fit px-4 tablet:px-7 py-2.5 tablet:py-3.5 text-sm tablet:text-base font-bold rounded-[1.875rem] bg-dark hover:bg-main disabled:bg-grey text-white uppercase shadow-border-dark disabled:shadow-none',
  'dark-hover':
    'w-fit px-4 tablet:px-7 py-2.5 tablet:py-3.5 text-sm tablet:text-base font-bold rounded-[1.875rem] bg-transparent hover:bg-main text-dark hover:text-white uppercase shadow-border-dark',
  'dark-hover-circle':
    'w-10 h-10 text-sm font-normal rounded-full bg-transparent hover:bg-main text-dark hover:text-white shadow-border-grey flex justify-center items-center hover:shadow-none',
  icon: 'w-9 tablet:w-10.5 h-9 tablet:h-10.5 flex justify-center items-center rounded-full',
  'modal-icon': 'flex justify-center items-center',
  text: 'tablet:text-base text-main text-sm font-medium',
};

const STATE_CLASSES = {
  default: {
    inactive: 'bg-white text-main',
    active: 'bg-dark hover:bg-main text-white shadow-border-grey',
  },
  favorite: {
    inactive: 'bg-transparent text-main',
    active: 'bg-main text-white',
  },
  icon: {
    inactive:
      'bg-transparent hover:bg-main text-main hover:text-white shadow-border-grey hover:shadow-none',
    active: 'bg-main text-white',
  },
};

const ButtonContent = ({ children, iconName, iconClass, iconVisualHiddenText }) => (
  <>
    {children}
    {iconName && (
      <svg className={cn(iconClass, 'text-inherit')} aria-hidden="true">
        <use href={`/icons.svg#${iconName}`}></use>
      </svg>
    )}
    {iconVisualHiddenText && <span className="sr-only">{iconVisualHiddenText}</span>}
  </>
);

export const Button = ({
  children,
  variant = 'default',
  type = 'button',
  className = '',
  iconName = '',
  iconClass = '',
  isActive = false,
  iconVisualHiddenText = '',
  href = '',
  external = false,
  ...props
}) => {
  const isIcon = variant === 'icon';
  const baseClass = VARIANTS[variant] || VARIANTS.default;
  const stateClass = STATE_CLASSES[variant]
    ? isActive
      ? STATE_CLASSES[variant].active
      : STATE_CLASSES[variant].inactive
    : '';

  const commonClasses = cn(baseClass, stateClass, className);

  const content = (
    <ButtonContent
      iconName={iconName}
      iconClass={iconClass}
      iconVisualHiddenText={iconVisualHiddenText}
    >
      {children}
    </ButtonContent>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={commonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={commonClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={commonClasses}
      aria-pressed={isIcon || variant === 'favorite' ? isActive : undefined}
      {...props}
    >
      {content}
    </button>
  );
};
