import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, className, onClick }) => {
  return (
    <button
      className={twMerge(
        "text-sky-400 bg-sky-400/10 px-4 py-2 leading-none rounded-xl outline-none border",
        "transition-all duration-150 border-sky-400/20 hover:bg-sky-400/20 focus:bg-sky-400/20",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
