import { useNodeContext } from "../context/NodeContext";
import { Node } from "../types/node";
import {
  getAllNodes,
  getNeighbours,
  getShortestPathNodes,
} from "../utils/algorithm";
import { sleep } from "../utils/sleep";

export const useDfs = () => {
  const {
    nodes,
    markNodeAsVisited,
    markNodeAsShortestPath,
    setIsRunning,
    setIsRan,
  } = useNodeContext();

  const bfs = (): [Node[], Node | null] => {
    const unvisitedNodes: Node[] = getAllNodes(nodes);

    // access the the start and the target nodes
    const startNode = [...unvisitedNodes]
      .filter((node) => node.isStartNode)
      .at(0)!;
    const targetNode = [...unvisitedNodes]
      .filter((node) => node.isTargetNode)
      .at(0)!;

    const structure: Node[] = [startNode];
    const nodesToAnimate: Node[] = [];
    const exploredNodes: string[] = [];

    while (structure.length > 0) {
      const currentNode = structure.pop()!;
      if (currentNode.isWall) continue;

      nodesToAnimate.push(currentNode);
      exploredNodes.push(`${currentNode.rowIndex}-${currentNode.colIndex}`);

      if (currentNode === targetNode) return [nodesToAnimate, targetNode];

      [...getNeighbours(currentNode, nodes)]
        .filter((node) => !node.isWall)
        .reverse()
        .forEach((neighbor) => {
          const id = `${neighbor.rowIndex}-${neighbor.colIndex}`;

          if (!exploredNodes.includes(id)) {
            neighbor.previousNode = { ...currentNode };
            structure.push(neighbor);
          }
        });
    }

    return [nodesToAnimate, null];
  };

  return async () => {
    setIsRan(false);
    setIsRunning(true);
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

    setIsRunning(false);
    setIsRan(true);
  };
};
