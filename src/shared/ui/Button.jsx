import clsx from "clsx";

export const Button = ({ children, variant = "default", type = "button", className = "", iconName = "", iconClass = "", isActive = false, href = "", onClick = () => {}, ...props }) => {
  const baseVariants = {
    default: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-xs leading-normal font-bold rounded-[1.875rem]",
    favorite: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base leading-[1.428571] md:leading-normal font-bold rounded-[1.875rem] shadow-[inset_0px_0px_1px_1px_var(--color-grey)]",
    dark: "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base leading-[1.428571] md:leading-normal font-bold rounded-[1.875rem] bg-dark hover:bg-main disabled:bg-grey text-white shadow-[inset_0px_0px_1px_1px_var(--color-dark)] disabled:shadow-none",
    'dark-hover': "w-fit px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base leading-[1.428571] md:leading-normal font-bold rounded-[1.875rem] bg-white hover:bg-main text-dark hover:text-white shadow-[inset_0px_0px_1px_1px_var(--color-dark)]",
  };

  const variantState = {
    default: {
      inactive: "bg-white text-main",
      active: "bg-dark hover:bg-main text-white shadow-[inset_0px_0px_1px_1px_var(--color-grey)]",
    },
    favorite: {
      inactive: "bg-white text-main",
      active: "bg-main text-white",
    },
  };

  if (variant === "icon") {
    if (href) {
      return (
        <a
          className={clsx(
            "w-9 md:w-10 h-9 md:h-10 flex justify-center items-center rounded-full bg-white text-dark shadow-[inset_0px_0px_1px_1px_var(--color-grey)]",
            className,
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children ?? (
            <svg className={clsx(iconClass, "text-inherit")}>
              <use href={`/icons.svg#${iconName}`}></use>
            </svg>
          )}
        </a>
      );
    }

    return (
      <button
        className={clsx(
          "w-9 md:w-10.5 h-9 md:h-10.5 flex justify-center items-center rounded-full",
          isActive ? "bg-dark text-white" : "bg-white text-dark shadow-[inset_0px_0px_1px_1px_var(--color-grey)]",
          className,
        )}
        type={type}
        onClick={onClick}
        aria-pressed={isActive}
        {...props}
      >
        {children ?? (
          <svg className={clsx(iconClass, "text-inherit")}>
            <use href={`/icons.svg#${iconName}`}></use>
          </svg>
        )}
      </button>
    );
  }

  const stateClasses = variantState[variant]
    ? isActive
      ? variantState[variant].active
      : variantState[variant].inactive
    : undefined;

  return (
    <button
      className={clsx(
        "uppercase",
        baseVariants[variant],
        stateClasses,
        className,
      )}
      type={type}
      onClick={onClick}
      aria-pressed={isActive || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
