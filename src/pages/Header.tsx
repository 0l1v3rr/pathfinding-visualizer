import Button from "../components/button/Button";
import HeaderButton from "../components/button/HeaderButton";
import { BsGithub } from "react-icons/bs";

const Header = () => {
  return (
    <header className="px-10 py-3 flex items-center border-b border-slate-300/10 gap-8">
      <h1 className="text-slate-200 font-semibold text-2xl">pathfinding</h1>

      <HeaderButton
        label="Clear Board"
        onClick={() => {}}
        className="ml-auto"
      />
      <HeaderButton label="Clear Walls" onClick={() => {}} />
      <Button label="Visualize!" onClick={() => {}} />

      <div className="w-[1px] h-6 bg-slate-300/10" />

      <a
        href="https://github.com/0l1v3rr/pathfinding-visualizer"
        rel="noreferrer"
        aria-label="GitHub"
        target="_blank"
        className="text-slate-400 text-xl cursor-pointer duration-150 
          transition-all hover:text-slate-200"
      >
        <BsGithub />
      </a>
    </header>
  );
};

export default Header;
