import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const HeaderButton: FC<HeaderButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "font-semibold leading-none text-slate-200 transition-all duration-150",
        "outline-none hover:text-sky-400 focus:text-sky-400",
        "disabled:text-slate-400",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
