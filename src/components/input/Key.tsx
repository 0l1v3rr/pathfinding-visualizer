import { FC } from "react";

interface KeyProps {
  label: string;
}

const Key: FC<KeyProps> = ({ label }) => {
  return (
    <span
      className="rounded-md border border-slate-700 bg-slate-800 
        px-1 py-0.5 font-mono text-sm shadow-md"
    >
      {label}
    </span>
  );
};

export default Key;
