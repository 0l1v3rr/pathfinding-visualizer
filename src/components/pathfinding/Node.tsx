import { FC, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { GRAPH_WIDTH, Node } from "../../types/node";
import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";

interface NodeItemProps {
  node: Node;
  className?: string;
  updateNode: (row: number, col: number, newNode: Node) => void;
}

const NodeItem: FC<NodeItemProps> = ({ node, className, updateNode }) => {
  const isRegularNode = useMemo(() => {
    return (
      node.isShortestPath ||
      node.isStartNode ||
      node.isTargetNode ||
      node.isVisited ||
      node.isWall
    );
  }, [node]);

  const updateWallStatus = useCallback(
    (isWall: boolean) => {
      updateNode(node.rowIndex, node.colIndex, {
        ...node,
        isWall,
      });
    },
    [updateNode, node]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.ctrlKey && node.isWall) {
        updateWallStatus(false);
        return;
      }

      if (isRegularNode) return;

      if (e.shiftKey && !node.isWall) {
        updateWallStatus(true);
        return;
      }
    },
    [node, isRegularNode, updateWallStatus]
  );

  return (
    <div
      draggable={node.isStartNode || node.isTargetNode}
      onMouseEnter={(e) => handleMouseEnter(e)}
      style={{
        width: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        height: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        fontSize: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
      }}
      className={twMerge(
        "border bg-slate-900/50 border-slate-300/10 text-slate-200",
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
