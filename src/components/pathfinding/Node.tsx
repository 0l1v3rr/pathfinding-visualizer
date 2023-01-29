import { FC, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { GRAPH_WIDTH, Node } from "../../types/node";
import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";

interface NodeItemProps {
  node: Node;
  updateNode: (row: number, col: number, newNode: Node) => void;
}

const NodeItem: FC<NodeItemProps> = ({ node, updateNode }) => {
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const isNotRegularNode = useMemo(() => {
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

      if (isNotRegularNode) return;

      if (e.shiftKey && !node.isWall) {
        updateWallStatus(true);
        return;
      }
    },
    [node, isNotRegularNode, updateWallStatus]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (!node.isStartNode && !node.isTargetNode) {
        e.preventDefault();
        return;
      }

      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(node));

      setTimeout(() => setIsDragged(true), 0);
    },
    [node]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      const data: Node = JSON.parse(e.dataTransfer.getData("application/json"));
      const { isStartNode, isTargetNode } = data;

      updateNode(node.rowIndex, node.colIndex, {
        ...node,
        isStartNode,
        isTargetNode,
      });

      updateNode(data.rowIndex, data.colIndex, {
        ...data,
        isStartNode: false,
        isTargetNode: false,
      });

      setIsDragged(false);
    },
    [node, updateNode]
  );

  return (
    <div
      draggable={node.isStartNode || node.isTargetNode}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={() => setIsDragged(false)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      style={{
        width: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        height: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        fontSize: isDragged ? "0" : `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
      }}
      className={twMerge(
        "border bg-slate-900/50 border-slate-300/10 text-slate-200",
        "transition-all flex items-center justify-center relative",
        "after:content-[''] after:absolute after:w-full after:h-full after:inset-0",
        "after:transition-[transform] after:duration-500 after:scale-0",
        node.isShortestPath
          ? "after:scale-100 duration-1000 after:bg-amber-400 border-amber-400"
          : "",
        node.isVisited
          ? "after:scale-100 duration-1000 after:bg-sky-500 border-sky-600"
          : "",
        node.isWall
          ? "after:scale-100 duration-1000 after:bg-black/60 border-black"
          : "",
        node.isStartNode || node.isTargetNode
          ? "cursor-pointer duration-200"
          : ""
      )}
    >
      {node.isStartNode && <GoChevronRight />}
      {node.isTargetNode && <BiTargetLock />}
    </div>
  );
};

export default NodeItem;
