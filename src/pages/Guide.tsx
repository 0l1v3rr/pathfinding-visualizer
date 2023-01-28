import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";

const Guide = () => {
  return (
    <div
      className="flex items-center justify-center mx-10 my-5 
        select-none text-lg text-slate-200 gap-x-16 gap-y-4 border border-slate-300/10 px-8 
        py-2 rounded-lg bg-slate-900/50 shadow-md flex-wrap"
    >
      <div className="flex items-center leading-none gap-1">
        <GoChevronRight className="text-3xl" />
        <span className="text-slate-300">Start</span>
      </div>

      <div className="flex items-center leading-none gap-2">
        <BiTargetLock className="text-2xl" />
        <span className="text-slate-300">Target</span>
      </div>

      <div className="flex items-center leading-none gap-2">
        <div className="w-6 h-6 border bg-slate-800 border-white/20" />
        <span className="text-slate-300">Unvisited</span>
      </div>

      <div className="flex items-center leading-none gap-2">
        <div className="w-6 h-6 border bg-sky-500 border-sky-600" />
        <span className="text-slate-300">Visited</span>
      </div>

      <div className="flex items-center leading-none gap-2">
        <div className="w-6 h-6 border bg-amber-400 border-amber-400" />
        <span className="text-slate-300">Shortest-path</span>
      </div>

      <div className="flex items-center leading-none gap-2">
        <div className="w-6 h-6 border bg-red-900/50 border-red-900/70" />
        <span className="text-slate-300">Wall</span>
      </div>
    </div>
  );
};

export default Guide;
