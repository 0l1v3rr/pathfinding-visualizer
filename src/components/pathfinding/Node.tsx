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

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (!node.isStartNode && !node.isTargetNode) {
        e.preventDefault();
        return;
      }

      setIsDragged(true);
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(node));
    },
    [node]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      const data: Node = JSON.parse(e.dataTransfer.getData("application/json"));
      const { isStartNode, isTargetNode } = data;

      setIsDragged(false);
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
        "transition-all duration-150 flex items-center justify-center",
        node.isShortestPath ? "bg-amber-400 border-amber-400" : "",
        node.isVisited ? "bg-sky-500 border-sky-600" : "",
        node.isWall ? "bg-black/60 border-black" : "",
        node.isStartNode || node.isTargetNode ? "cursor-pointer" : ""
      )}
    >
      {node.isStartNode && <GoChevronRight />}
      {node.isTargetNode && <BiTargetLock />}
    </div>
  );
};

export default NodeItem;
