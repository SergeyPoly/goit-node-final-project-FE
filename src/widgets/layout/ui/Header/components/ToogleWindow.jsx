// TODO total refactoring needed
export const ToggledWindow = ({ isOpen = false, logout }) => {
  {
    return (
      isOpen && (
        <div className="rigth-10 tablet:right-0 absolute top-[34px] mt-2 flex w-30 flex-col gap-1 rounded-xl border-1 border-[var(--color-white)] bg-[var(--color-dark)] p-4">
          <button className="w-full text-left text-sm text-xs font-bold font-medium text-white uppercase">
            Profile
          </button>
          <button
            className="flex w-full gap-[2px] text-left text-sm text-xs font-bold font-medium text-white uppercase"
            onClick={() => logout()}
          >
            Log out
            <svg className="h-4 w-4 text-[var(--color-white)]">
              <use href="/icons.svg#arrow-up-right-icon"></use>
            </svg>
          </button>
        </div>
      )
    );
  }
};
