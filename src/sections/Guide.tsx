import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";

const Guide = () => {
  return (
    <div className="mx-2 mt-[4.9rem] mb-5 flex select-none flex-wrap items-center justify-center gap-x-16 gap-y-4 rounded-lg border border-slate-300/10 bg-slate-900/50 px-8 py-2 text-lg text-slate-200 shadow-md sm:mx-4 md:mx-10">
      <div className="flex items-center gap-1 leading-none">
        <GoChevronRight className="text-3xl" />
        <span className="text-slate-300">Start</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <BiTargetLock className="text-2xl" />
        <span className="text-slate-300">Target</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <div className="h-6 w-6 border border-slate-300/20 bg-slate-900/50" />
        <span className="text-slate-300">Unvisited</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <div className="h-6 w-6 border border-sky-600 bg-sky-500" />
        <span className="text-slate-300">Visited</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <div className="h-6 w-6 border border-amber-400 bg-amber-400" />
        <span className="text-slate-300">Shortest-path</span>
      </div>

      <div className="flex items-center gap-2 leading-none">
        <div className="h-6 w-6 border border-black bg-black/60" />
        <span className="text-slate-300">Wall</span>
      </div>
    </div>
  );
};

export default Guide;
