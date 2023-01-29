import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { GRAPH_WIDTH, Node } from "../../types/node";
import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";

interface NodeItemProps {
  node: Node;
  className?: string;
}

const NodeItem: FC<NodeItemProps> = ({ node, className }) => {
  return (
    <div
      style={{
        width: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        height: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        fontSize: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
      }}
      className={twMerge(
        "border bg-slate-900/50 border-slate-300/[.13] text-slate-200",
        node.isShortestPath ? "bg-amber-400 border-amber-400" : "",
        node.isVisited ? "bg-sky-500 border-sky-600" : "",
        node.isWall ? "bg-black/60 border-black" : "",
        node.isStartNode || node.isTargetNode ? "cursor-pointer" : "",
        className
      )}
    >
      {node.isStartNode && <GoChevronRight />}
      {node.isTargetNode && <BiTargetLock />}
    </div>
  );
};

export default NodeItem;
