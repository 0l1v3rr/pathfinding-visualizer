import Button from "../components/button/Button";
import HeaderButton from "../components/button/HeaderButton";
import { BsGithub } from "react-icons/bs";
import { useContext } from "react";
import Select from "../components/input/Select";
import { algorithms } from "../const/algorithms";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { useVisualize } from "../hooks/useVisualize";

const Header = () => {
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    clearWalls,
    resetBoard,
    isRunning,
  } = useContext(NodeContext) as NodeContextType;
  const visualizeAlgorithm = useVisualize(selectedAlgorithm);

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-center gap-8 border-b border-slate-300/10 bg-slate-900/20 px-4 py-3 shadow-md backdrop-blur-sm sm:px-10 md:justify-start">
      <h1 className="hidden font-arial text-xl font-semibold text-slate-200 md:block">
        Pathfinding
      </h1>

      <Select
        options={algorithms}
        value={selectedAlgorithm}
        setValue={setSelectedAlgorithm}
        className="md:ml-auto"
        disabled={isRunning}
      />

      <HeaderButton onClick={() => resetBoard()} disabled={isRunning}>
        Reset Board
      </HeaderButton>
      <HeaderButton
        onClick={() => clearWalls()}
        className="hidden sm:block"
        disabled={isRunning}
      >
        Clear Walls
      </HeaderButton>
      <Button onClick={() => visualizeAlgorithm()} disabled={isRunning}>
        Visualize!
      </Button>

      <div className="hidden h-6 w-[1px] bg-slate-300/10 sm:block" />

      <a
        href="https://github.com/0l1v3rr/pathfinding-visualizer"
        rel="noreferrer"
        aria-label="GitHub"
        target="_blank"
        className="hidden cursor-pointer text-xl text-slate-400 outline-none transition-all duration-150 hover:text-slate-200 focus:text-slate-200 sm:block"
      >
        <BsGithub />
      </a>
    </header>
  );
};

export default Header;
