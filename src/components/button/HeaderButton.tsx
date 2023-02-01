import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const HeaderButton: FC<HeaderButtonProps> = ({ label, className, onClick }) => {
  return (
    <button
      className={twMerge(
        "font-semibold leading-none text-slate-200 transition-all duration-150",
        "outline-none hover:text-sky-400 focus:text-sky-400",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HeaderButton;
