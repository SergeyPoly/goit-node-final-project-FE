export const ToggledWindow = ({ isOpen = false, logout }) => {
    {
        return isOpen && (
            <div className="absolute flex flex-col gap-1 p-4 rigth-10 tablet:right-0 top-[34px] mt-2 w-30 rounded-xl border-1 border-[var(--color-white)] bg-[var(--color-dark)] ">
                <button className="text-xs w-full text-sm font-medium text-white uppercase font-bold text-left">
                    Profile
                </button>
                <button className="flex gap-[2px] text-xs w-full text-sm font-medium text-white uppercase font-bold text-left" onClick={() => logout()}>
                    Log out
                    <svg className="text-[var(--color-white)] w-4 h-4">
                        <use href="/icons.svg#arrow-up-right-icon"></use>
                    </svg>
                </button></div>)
    }
}
