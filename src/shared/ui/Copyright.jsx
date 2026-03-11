import clsx from "clsx";

export const Copyright = ({className = ""}) => (
  <p className={clsx("text-center text-sm md:text-base font-medium tracking-tight", className)}>
    @2024, Foodies. All rights reserved.
  </p>
);
