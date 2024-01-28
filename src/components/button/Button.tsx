import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        "rounded-xl border bg-sky-400/10 px-4 py-2 leading-none text-sky-400 outline-none",
        "border-sky-400/20 transition-all duration-150 hover:bg-sky-400/20 focus:bg-sky-400/20",
        "border-sky-600/20 disabled:text-sky-600 disabled:hover:bg-sky-400/10",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
