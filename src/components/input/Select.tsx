import { FC, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface SelectInputProps {
  value: string;
  setValue: (value: string) => void;
  options: readonly string[];
  className?: string;
}

const Select: FC<SelectInputProps> = ({
  className,
  value,
  options,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectValue = useCallback(
    (e: React.MouseEvent, value: string) => {
      e.stopPropagation();
      setValue(value);
    },
    [setValue]
  );

  return (
    <button
      onClick={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      className={twMerge(
        `relative z-10 flex items-center justify-center gap-2
          whitespace-nowrap rounded-xl border border-slate-700 bg-slate-800 
          px-3 py-2 text-sm font-semibold leading-none 
          text-slate-400 outline-none transition-all duration-150
          hover:border-slate-500 hover:bg-slate-700/75 focus:border-slate-500 focus:bg-slate-700/75`,
        className
      )}
    >
      <span>{value}</span>
      <FiChevronDown
        className={twMerge(
          "transition-all duration-150",
          isOpen ? "-rotate-180" : "rotate-0"
        )}
      />

      <div
        className={twMerge(
          "absolute top-10 left-0 z-10 rounded-lg border border-slate-700 bg-slate-800 py-2 shadow-md",
          isOpen ? "block" : "hidden"
        )}
      >
        {options.map((option) => {
          const isSelected = option === value;

          return (
            <div
              key={option}
              onClick={(e) => handleSelectValue(e, option)}
              className={twMerge(
                "flex items-center justify-between",
                "w-56 cursor-pointer py-2 px-4 text-sm font-semibold hover:bg-slate-700",
                isSelected ? "text-sky-400" : "text-slate-300"
              )}
            >
              <span>{option}</span>
              {isSelected && <FiCheck />}
            </div>
          );
        })}
      </div>
    </button>
  );
};

export default Select;
