import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  className?: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-xl border bg-sky-400/10 px-4 py-2 leading-none text-sky-400 outline-none",
        "border-sky-400/20 transition-all duration-150 hover:bg-sky-400/20 focus:bg-sky-400/20",
        "border-sky-600/20 disabled:text-sky-600 disabled:hover:bg-sky-400/10",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
