import { FC, ReactElement, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../button/Button";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IconType } from "react-icons";

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  icon: IconType;
}

interface PopupPage {
  header: string;
  content: ReactElement;
}

const pages: PopupPage[] = [
  {
    header: "Welcome!",
    content: <div>Welcome to my Pathfinding Visualization project!</div>,
  },
  {
    header: "What is a Pathfinding Algorithm?",
    content: (
      <div>
        A pathfinding algorithm tries to find the shortest path between two
        points. This application visualizes several pathfinding algorithms in
        action!
      </div>
    ),
  },
];

const PaginationButton: FC<PaginationButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
      className="rounded-md border border-slate-700 bg-slate-800 px-2
        text-sm leading-none text-slate-200 outline-none transition-all 
        duration-300 hover:border-slate-600 hover:bg-slate-700 hover:text-white
        disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500"
    >
      <props.icon />
    </button>
  );
};

const PopupContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div
        className={twMerge(
          "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 shadow-md",
          "border border-slate-200/10 bg-slate-900 transition-all duration-200",
          "flex flex-col gap-4 rounded-lg px-4 py-2",
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-50 opacity-0"
        )}
      >
        <div className="text-center text-lg font-semibold uppercase text-slate-200">
          {pages[page - 1].header}
        </div>

        <div className="text-slate-300">{pages[page - 1].content}</div>

        <div className="flex items-stretch justify-between gap-6 text-sm">
          <div>
            <Button
              disabled={false}
              label="Skip Tutorial"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex select-none items-center  text-slate-400">
            <span className="text-slate-300">{page}</span>/
            <span className="text-slate-300">{pages.length}</span>
          </div>

          <div className="flex items-stretch justify-center gap-2">
            <PaginationButton
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              icon={BsChevronLeft}
            />

            <PaginationButton
              disabled={page >= pages.length}
              onClick={() => setPage((prev) => prev + 1)}
              icon={BsChevronRight}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-screen transition-all 
        duration-150 ${
          isOpen ? "bg-black/20 backdrop-blur-sm" : "pointer-events-none"
        }`}
      />
    </>
  );
};

export default PopupContainer;
