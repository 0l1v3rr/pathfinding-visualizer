import Button from "../components/button/Button";
import HeaderButton from "../components/button/HeaderButton";
import { BsGithub } from "react-icons/bs";
import { FC } from "react";
import Select from "../components/input/Select";
import { algorithms } from "../const/algorithms";

interface HeaderProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (val: string) => void;
}

const Header: FC<HeaderProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  return (
    <header
      className="px-4 sm:px-10 py-3 flex items-center border-b border-slate-300/10 
        gap-8 justify-center md:justify-start"
    >
      <h1 className="hidden md:block text-slate-200 font-semibold text-2xl">
        pathfinding
      </h1>

      <Select
        options={algorithms}
        value={selectedAlgorithm}
        setValue={setSelectedAlgorithm}
        className="md:ml-auto"
      />

      <HeaderButton label="Clear Board" onClick={() => {}} />
      <HeaderButton
        label="Clear Walls"
        onClick={() => {}}
        className="hidden sm:block"
      />
      <Button label="Visualize!" onClick={() => {}} />

      <div className="w-[1px] h-6 bg-slate-300/10 hidden sm:block" />

      <a
        href="https://github.com/0l1v3rr/pathfinding-visualizer"
        rel="noreferrer"
        aria-label="GitHub"
        target="_blank"
        className="text-slate-400 text-xl cursor-pointer duration-150 
          transition-all hover:text-slate-200 hidden sm:block"
      >
        <BsGithub />
      </a>
    </header>
  );
};

export default Header;
