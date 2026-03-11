import clsx from "clsx";

export const Logo = ({ className = "",href="" }) => (
  <a href={href} className={clsx("text-xl md:text-2xl font-extrabold tracking-tight", className)}>foodies</a>
);
