import { FC, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface SelectInputProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
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
        `relative bg-slate-800 rounded-xl border px-3 py-1
          border-slate-700 leading-none flex items-center justify-center 
          gap-2 text-slate-400 font-semibold text-sm transition-all 
          duration-150 hover:border-slate-500 hover:bg-slate-700/75 z-10
          focus:border-slate-500 focus:bg-slate-700/75 outline-none whitespace-nowrap`,
        className
      )}
    >
      <span>{value}</span>
      <FiChevronDown />

      <div
        className={twMerge(
          "absolute bg-slate-800 border border-slate-700 rounded-lg top-10 left-0 shadow-md py-2 z-10",
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
                "py-2 px-4 font-semibold text-sm w-56 cursor-pointer hover:bg-slate-700",
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
