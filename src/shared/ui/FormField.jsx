import clsx from "clsx"
import { useState } from "react";

export const FormField = ({
    placeholder,
    type = "text",
    className = "",
    iconClass,
    id = "",
    name = "" }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const fieldStyles = clsx("w-full p-3.5 border-box border-1 font-500 text-[var(--color-main)] placeholder-shown:border-[var(--color-grey)] border-[var(--color-main)] outline-none placeholder:text-[var(--color-grey)] text-sm tablet:text-base font-bold rounded-[1.875rem]", className)
    return (
        <div className={isPassword ? "relative" : ""}>
            <input
                id={id}
                name={name}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={fieldStyles}
                placeholder={placeholder}>

            </input>
            {isPassword && (
                <button onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-[1rem] tablet:top-[1.2rem]">
                <svg className={clsx(iconClass, "text-inherit")}>
                    <use href={`/icons.svg#${showPassword ? "eye-icon" : "eye-slash-icon"}`}>
                    </use>
                </svg>
            </button>
            )}
        </div>
    )


}