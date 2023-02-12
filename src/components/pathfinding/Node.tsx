import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { GRAPH_WIDTH, Node } from "../../types/node";
import { GoChevronRight } from "react-icons/go";
import { BiTargetLock } from "react-icons/bi";
import { NodeContext, NodeContextType } from "../../context/NodeContext";

interface NodeItemProps {
  node: Node;
  isMousePressed: boolean;
  setIsMousePressed: (val: boolean) => void;
}

const NodeItem: FC<NodeItemProps> = ({
  node,
  setIsMousePressed,
  isMousePressed,
}) => {
  const { updateNode, updateWallStatus, isRunning } = useContext(
    NodeContext
  ) as NodeContextType;

  const [isDragged, setIsDragged] = useState<boolean>(false);
  const isNotRegularNode = useMemo(() => {
    return (
      node.isShortestPath ||
      node.isStartNode ||
      node.isTargetNode ||
      node.isVisited
    );
  }, [node]);

  const handleClick = useCallback(() => {
    if (isNotRegularNode) return;
    if (isDragged) return;
    if (isRunning) return;

    const { isWall } = node;

    updateWallStatus(node, !isWall);
  }, [isNotRegularNode, isDragged, isRunning, node, updateWallStatus]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // we only create walls if the mouse is pressed and it's an empty node
      if (!isMousePressed) return;
      if (isNotRegularNode) return;
      if (isDragged) return;
      if (isRunning) return;

      const { isWall } = node;

      // if the control is pressed, we only REMOVE walls
      if (e.ctrlKey && !isWall) {
        updateWallStatus(node, false);
        return;
      }

      // if the shift is pressed, we only CREATE walls
      if (e.shiftKey && isWall) {
        updateWallStatus(node, true);
        return;
      }

      updateWallStatus(node, !isWall);
    },
    [
      isMousePressed,
      updateWallStatus,
      node,
      isNotRegularNode,
      isDragged,
      isRunning,
    ]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (isRunning || node.isShortestPath) {
        e.preventDefault();
        return;
      }

      // we cannot drag a node if it's not the start or the target node
      if (!node.isStartNode && !node.isTargetNode) {
        e.preventDefault();
        return;
      }

      setIsMousePressed(false);

      e.dataTransfer.clearData();
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(node));

      setTimeout(() => setIsDragged(true), 0);
    },
    [node, setIsMousePressed, isRunning]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      const data: Node = JSON.parse(e.dataTransfer.getData("application/json"));
      const { isStartNode, isTargetNode } = data;

      updateNode(node.rowIndex, node.colIndex, {
        ...node,
        isStartNode,
        isTargetNode,
        distance: isStartNode ? 0 : Infinity,
      });

      updateNode(data.rowIndex, data.colIndex, {
        ...data,
        isStartNode: false,
        isTargetNode: false,
        distance: Infinity,
      });

      setIsDragged(false);
      setIsMousePressed(false);
      e.dataTransfer.clearData();
    },
    [node, updateNode, setIsMousePressed]
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
      draggable={
        (!node.isShortestPath || !isRunning) &&
        (node.isStartNode || node.isTargetNode)
      }
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseDown={() => setIsMousePressed(true)}
      onMouseUp={() => setIsMousePressed(false)}
      onClick={() => handleClick()}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={() => setIsDragged(false)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      style={{
        width: `calc(100vi / ${GRAPH_WIDTH})`,
        height: `calc(100vi / ${GRAPH_WIDTH})`,
        fontSize: isDragged ? "0" : `calc(100vi / ${GRAPH_WIDTH})`,
        // width: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        // height: `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
        // fontSize: isDragged ? "0" : `calc((100vw - 5rem) / ${GRAPH_WIDTH})`,
      }}
      className={twMerge(
        "border border-slate-300/10 bg-slate-900/50 text-slate-200",
        "relative flex items-center justify-center transition-all",
        "after:absolute after:inset-0 after:h-full after:w-full after:content-['']",
        "overflow-hidden after:scale-50 after:hue-rotate-90",
        "after:transition-[transform,filter] after:duration-300",
        node.isVisited
          ? "border-sky-600 bg-red-400 duration-1000 after:scale-100 after:bg-sky-500 after:hue-rotate-0"
          : "",
        node.isShortestPath
          ? "border-amber-500 bg-amber-400 duration-500 after:scale-0 after:hue-rotate-0"
          : "",
        node.isWall
          ? "border-black duration-1000 after:scale-100 after:bg-black/60"
          : "",
        node.isStartNode || node.isTargetNode
          ? node.isShortestPath || isRunning
            ? "cursor-not-allowed"
            : "cursor-pointer duration-200"
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
