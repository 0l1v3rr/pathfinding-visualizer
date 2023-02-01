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
        "flex min-h-screen w-full flex-col overflow-x-hidden pb-5",
        "bg-gradient",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Main;
