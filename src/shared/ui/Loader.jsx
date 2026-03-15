export const Loader = ({ size = 40 }) => {
  const borderWidth = size / 10;

  return (
    <div
      className={`h-[${size}px] w-[${size}px] animate-spin rounded-3xl border-${borderWidth} border-gray-300 border-t-black`}
    />
  );
};
