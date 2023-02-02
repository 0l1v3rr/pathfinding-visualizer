import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { GRAPH_WIDTH, Node } from "../../types/node";
import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";
import { NodeContext, NodeContextType } from "../../context/NodeContext";

interface NodeItemProps {
  node: Node;
}

const NodeItem: FC<NodeItemProps> = ({ node }) => {
  const { updateNode } = useContext(NodeContext) as NodeContextType;

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

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (node.isWall || node.isStartNode || node.isTargetNode) return;

      e.preventDefault();
    },
    [node.isStartNode, node.isTargetNode, node.isWall]
  );

  return (
    <div
      draggable={node.isStartNode || node.isTargetNode}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={() => setIsDragged(false)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      style={{
        width: `calc(100vi / ${GRAPH_WIDTH})`,
        height: `calc(100vi / ${GRAPH_WIDTH})`,
        fontSize: isDragged ? "0" : `calc((100vi) / ${GRAPH_WIDTH})`,
        // width: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        // height: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        // fontSize: isDragged ? "0" : `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
      }}
      className={twMerge(
        "border border-slate-300/10 bg-slate-900/50 text-slate-200",
        "relative flex items-center justify-center transition-all",
        "after:absolute after:inset-0 after:h-full after:w-full after:content-['']",
        "overflow-hidden after:scale-50 after:rounded-sm after:hue-rotate-90",
        "after:transition-[transform,filter] after:duration-300",
        node.isVisited
          ? `border-sky-600 duration-1000 after:scale-100 after:rounded-none
              after:bg-sky-500 after:hue-rotate-0`
          : "",
        node.isShortestPath
          ? "border-amber-400 duration-1000 after:scale-100 after:bg-amber-400"
          : "",
        node.isWall
          ? "border-black duration-1000 after:scale-100 after:bg-black/60"
          : "",
        node.isStartNode || node.isTargetNode
          ? "cursor-pointer duration-200"
          : ""
      )}
    >
      {node.isStartNode && (
        <GoChevronRight
          className={twMerge(
            "z-20",
            node.isShortestPath || node.isVisited
              ? "text-slate-900"
              : "text-slate-200"
          )}
        />
      )}

      {node.isTargetNode && (
        <BiTargetLock
          className={twMerge(
            "z-20",
            node.isShortestPath || node.isVisited
              ? "text-slate-900"
              : "text-slate-200"
          )}
        />
      )}
    </div>
  );
};

export default NodeItem;
