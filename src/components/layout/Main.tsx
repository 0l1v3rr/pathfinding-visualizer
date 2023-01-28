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
        "w-full min-h-screen flex flex-col overflow-x-hidden bg-slate-900",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Main;
