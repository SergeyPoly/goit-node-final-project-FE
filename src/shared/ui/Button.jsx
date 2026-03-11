import { Link } from "react-router-dom";
import clsx from "clsx";

const VARIANTS = {
  default: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-xs font-bold rounded-[1.875rem] uppercase",
  favorite: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base font-bold rounded-[1.875rem] shadow-[inset_0px_0px_1px_1px_var(--color-grey)] uppercase",
  dark: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base font-bold rounded-[1.875rem] bg-dark hover:bg-main disabled:bg-grey text-white uppercase shadow-[inset_0px_0px_1px_1px_var(--color-dark)] disabled:shadow-none",
  'dark-hover': "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base font-bold rounded-[1.875rem] bg-white hover:bg-main text-dark hover:text-white uppercase shadow-[inset_0px_0px_1px_1px_var(--color-dark)]",
  icon: "w-9 md:w-10.5 h-9 md:h-10.5 flex justify-center items-center rounded-full",
};

const STATE_CLASSES = {
  default: {
    inactive: "bg-white text-main",
    active: "bg-dark hover:bg-main text-white shadow-[inset_0px_0px_1px_1px_var(--color-grey)]",
  },
  favorite: {
    inactive: "bg-white text-main",
    active: "bg-main text-white",
  },
  icon: {
    inactive: "bg-white hover:bg-main text-main hover:text-white shadow-[inset_0px_0px_1px_1px_var(--color-grey)] hover:shadow-none",
    active: "bg-main text-white",
  }
};

const ButtonContent = ({ children, iconName, iconClass, iconVisualHiddenText }) => (
  <>
    {children}
    {iconName && (
      <svg className={clsx(iconClass, "text-inherit")} aria-hidden="true">
        <use href={`/icons.svg#${iconName}`}></use>
      </svg>
    )}
    {iconVisualHiddenText && (
      <span className="visually-hidden">{iconVisualHiddenText}</span>
    )}
  </>
);

export const Button = ({
  children,
  variant = "default",
  type = "button",
  className = "",
  iconName = "",
  iconClass = "",
  isActive = false,
  iconVisualHiddenText = "",
  href = "",
  external = false,
  ...props
}) => {
  const isIcon = variant === "icon";
  const baseClass = VARIANTS[variant] || VARIANTS.default;
  const stateClass = STATE_CLASSES[variant] 
    ? (isActive ? STATE_CLASSES[variant].active : STATE_CLASSES[variant].inactive)
    : "";

  const commonClasses = clsx(baseClass, stateClass, className);

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
        <a href={href} className={commonClasses} target="_blank" rel="noopener noreferrer" {...props}>
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
      aria-pressed={(isIcon || variant === 'favorite') ? isActive : undefined}
      {...props}
    >
      {content}
    </button>
  );
};