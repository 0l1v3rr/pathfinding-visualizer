import { useCallback, useContext } from "react";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { Node } from "../types/node";
import {
  getAllNodes,
  getNeighbours,
  getShortestPathNodes,
} from "../utils/algorithm";
import { sleep } from "../utils/sleep";

export const useBfs = () => {
  const { nodes, markNodeAsVisited, markNodeAsShortestPath } = useContext(
    NodeContext
  ) as NodeContextType;

  const bfs = useCallback((): [Node[], Node | null] => {
    const unvisitedNodes: Node[] = getAllNodes(nodes);

    // access the the start and the target node
    const startNode = [...unvisitedNodes]
      .filter((node) => node.isStartNode)
      .at(0)!;
    const targetNode = [...unvisitedNodes]
      .filter((node) => node.isTargetNode)
      .at(0)!;

    const structure: Node[] = [startNode];

    while (structure.length > 0) {
      const currentNode = structure.shift()!;
      if (currentNode.isWall) continue;

      structure.push(currentNode);
      if (currentNode === targetNode) return [structure, targetNode];

      getNeighbours(currentNode, nodes)
        .filter((node) => !structure.includes(node))
        .forEach((neighbour) => {
          neighbour.previousNode = currentNode;
          structure.push(neighbour);
        });
    }

    return [structure, null];
  }, [nodes]);

  // animate the nodes
  return async () => {
    const [nodesInOrder, finishNode] = bfs();

    for (let node of nodesInOrder) {
      markNodeAsVisited(node);
      await sleep(4);
    }

    if (finishNode !== null) {
      for (const n of getShortestPathNodes(finishNode)) {
        markNodeAsShortestPath(n);
        await sleep(50);
      }
    }
  };
};
