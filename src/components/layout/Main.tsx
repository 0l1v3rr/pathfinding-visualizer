import { FC, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface MainProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

const Main: FC<MainProps> = ({ children, className }) => {
  return (
    <main
      className={twMerge(
        "w-full min-h-screen flex flex-col overflow-x-hidden",
        "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]",
        "from-sky-400/10 via-slate-900 to-slate-900",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Main;
