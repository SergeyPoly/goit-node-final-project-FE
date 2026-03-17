export const IngredientItem = ({ name, img, measure }) => {
  return (
    <li className="flex items-center gap-3 tablet:gap-4">
      <div className="w-16 h-16 tablet:w-20 tablet:h-20 border border-main/10 rounded-[0.75rem] tablet:rounded-[1.25rem] flex items-center justify-center shrink-0 p-2 overflow-hidden bg-[#FAFAFA]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-dark truncate leading-tight mb-0.5">
          {name}
        </span>
        <span className="text-xs tablet:text-sm text-main/50 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {measure}
        </span>
      </div>
    </li>
  );
};
