import { useCallback, useContext } from "react";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { Node, getStartNode, getTargetNode } from "../types/node";
import {
  getAllNodes,
  getShortestPathNodes,
  updateUnvisitedNeighbours,
} from "../utils/algorithm";
import { sleep } from "../utils/sleep";

export const useDijkstras = () => {
  const { nodes, markNodeAsVisited, markNodeAsShortestPath } = useContext(
    NodeContext
  ) as NodeContextType;

  const dijkstra = useCallback(
    async (grid: Node[][], startNode: Node, finishNode: Node) => {
      const unvisitedNodes = getAllNodes(grid);
      startNode.distance = 0;

      while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

        const closestNode = unvisitedNodes.shift();
        if (!closestNode) continue;

        // it's a wall, do nothing
        if (closestNode.isWall) continue;

        // if the distance is infinity, we are trapped, that's why we return.
        if (closestNode.distance === Infinity) return;

        closestNode.isVisited = true;

        // if we hit the target
        if (closestNode === finishNode) {
          for (const n of getShortestPathNodes(finishNode)) {
            markNodeAsShortestPath(n);
            await sleep(50);
          }

          return;
        }

        // update the state and "sleep" for X milliseconds
        await sleep(4);
        markNodeAsVisited(closestNode);

        updateUnvisitedNeighbours(closestNode, grid);
      }
    },
    [markNodeAsShortestPath, markNodeAsVisited]
  );

  return async () => {
    await dijkstra(nodes, getStartNode(nodes), getTargetNode(nodes));
  };
};
