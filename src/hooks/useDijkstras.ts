import { useContext } from "react";
import { NodeContext, NodeContextType } from "../context/NodeContext";
import { Node, getStartNode, getTargetNode } from "../types/node";
import { sleep } from "../utils/sleep";

function getAllNodes(grid: Node[][]) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function getUnvisitedNeighbours(node: Node, grid: Node[][]) {
  const neighbours = [];
  const { rowIndex, colIndex } = node;
  if (rowIndex > 0) neighbours.push(grid[rowIndex - 1][colIndex]);
  if (rowIndex < grid.length - 1) neighbours.push(grid[rowIndex + 1][colIndex]);
  if (colIndex > 0) neighbours.push(grid[rowIndex][colIndex - 1]);
  if (colIndex < grid[0].length - 1)
    neighbours.push(grid[rowIndex][colIndex + 1]);
  return neighbours.filter((neighbor) => !neighbor.isVisited);
}

export const useDijkstras = () => {
  const { nodes, updateNode } = useContext(NodeContext) as NodeContextType;

  async function dijkstra(grid: Node[][], startNode: Node, finishNode: Node) {
    const visitedNodesInOrder: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);

      const closestNode = unvisitedNodes.shift();

      if (!closestNode) continue;
      if (closestNode.isWall) continue;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === finishNode) {
        closestNode.isShortestPath = true;
        return visitedNodesInOrder;
      }

      // await sleep(4);
      updateNode(closestNode.rowIndex, closestNode.colIndex, {
        ...closestNode,
        isVisited: true,
      });

      updateUnvisitedNeighbours(closestNode, grid);
    }
  }

  function updateUnvisitedNeighbours(node: Node, grid: Node[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
    }
  }

  return async () => {
    await dijkstra(nodes, getStartNode(nodes), getTargetNode(nodes));
  };
};
