import { useCallback, useContext } from "react";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { Node } from "../types/node";
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

  const dijkstra = useCallback((): [Node[], Node | null] => {
    const unvisitedNodes: Node[] = getAllNodes(nodes);
    const visitedNodes: Node[] = [];

    // access the the finish node
    const finishNode = [...unvisitedNodes]
      .filter((node) => node.isTargetNode)
      .at(0);

    // no need to set the startNodes' distance to 0, since it's already set
    // also, it's the first node that gets visited because of the sort function below

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);

      const closestNode = unvisitedNodes.shift();
      if (!closestNode) continue;

      // it's a wall, do nothing
      if (closestNode.isWall) continue;

      // if the distance is infinity, we are trapped, that's why we return.
      if (closestNode.distance === Infinity) return [visitedNodes, null];

      visitedNodes.push(closestNode);

      // if we hit the target
      if (closestNode === finishNode) return [visitedNodes, finishNode];

      updateUnvisitedNeighbours(closestNode, nodes);
    }

    return [visitedNodes, null];
  }, [nodes]);

  // animate the nodes
  return async () => {
    const [nodesInOrder, finishNode] = dijkstra();

    for (const node of nodesInOrder) {
      markNodeAsVisited(node);
      await sleep(4);
    }

    if (finishNode !== null) {
      for (const n of getShortestPathNodes(finishNode)) {
        markNodeAsShortestPath(n);
        await sleep(15);
      }
    }
  };
};
