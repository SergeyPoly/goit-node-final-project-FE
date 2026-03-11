import clsx from "clsx";

export const Logo = ({ isDarkType = true }) => (
  <a href="/" className={clsx("text-xl md:text-2xl font-extrabold tracking-tight", isDarkType ? "text-[--color-main]" : "text-[--color-white]")}>foodies</a>
);
