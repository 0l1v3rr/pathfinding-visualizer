import Button from "../components/button/Button";
import HeaderButton from "../components/button/HeaderButton";
import { BsGithub } from "react-icons/bs";
import { useContext } from "react";
import Select from "../components/input/Select";
import { algorithms } from "../const/algorithms";
import { NodeContext, NodeContextType } from "../context/NodeContext";

const Header = () => {
  const { selectedAlgorithm, setSelectedAlgorithm, clearWalls, resetBoard } =
    useContext(NodeContext) as NodeContextType;

  return (
    <header
      className="px-4 sm:px-10 py-3 flex items-center border-b border-slate-300/10 top-0
        gap-8 justify-center md:justify-start backdrop-blur-sm z-10 fixed w-full 
        bg-slate-900/20 shadow-md"
    >
      <h1 className="hidden md:block text-slate-200 font-semibold text-xl font-arial">
        Pathfinding
      </h1>

      <Select
        options={algorithms}
        value={selectedAlgorithm}
        setValue={setSelectedAlgorithm}
        className="md:ml-auto"
      />

      <HeaderButton label="Reset Board" onClick={() => resetBoard()} />
      <HeaderButton
        label="Clear Walls"
        onClick={() => clearWalls()}
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
          transition-all hover:text-slate-200 hidden sm:block 
          focus:text-slate-200 outline-none"
      >
        <BsGithub />
      </a>
    </header>
  );
};

export default Header;
