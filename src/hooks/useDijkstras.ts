import { useContext } from "react";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { Node, getStartNode, getTargetNode } from "../types/node";
import {
  getAllNodes,
  getShortestPathNodes,
  updateUnvisitedNeighbours,
} from "../utils/algorithm";
import { sleep } from "../utils/sleep";

export const useDijkstras = () => {
  const { nodes, updateNode } = useContext(NodeContext) as NodeContextType;

  const dijkstra = async (
    grid: Node[][],
    startNode: Node,
    finishNode: Node
  ) => {
    const visitedNodesInOrder: Node[] = [];
    startNode.distance = 0;

    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);

      // remove the first element
      const closestNode = unvisitedNodes.shift();
      if (!closestNode) continue;

      // it's a wall, do nothing
      if (closestNode.isWall) continue;

      // If the distance is infinity, we are trapped, that's why we return.
      if (closestNode.distance === Infinity) return;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === finishNode) {
        for (const n of getShortestPathNodes(finishNode)) {
          updateNode(n.rowIndex, n.colIndex, {
            ...n,
            isVisited: false,
            isShortestPath: true,
          });
          await sleep(50);
        }

        return;
      }

      // "sleep" for X milliseconds
      await sleep(4);

      // update the state
      updateNode(closestNode.rowIndex, closestNode.colIndex, {
        ...closestNode,
        isVisited: true,
      });

      updateUnvisitedNeighbours(closestNode, grid);
    }
  };

  return async () => {
    await dijkstra(nodes, getStartNode(nodes), getTargetNode(nodes));
  };
};
