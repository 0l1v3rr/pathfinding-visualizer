import { GRAPH_HEIGHT, GRAPH_WIDTH, Node } from "../types/node";

export const getAllNodes = (grid: Node[][]) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const getUnvisitedNeighbours = (node: Node, grid: Node[][]) => {
  const neighbours = [];
  const { rowIndex, colIndex } = node;

  if (rowIndex > 0) {
    neighbours.push(grid[rowIndex - 1][colIndex]);
  }
  if (rowIndex < GRAPH_HEIGHT - 1) {
    neighbours.push(grid[rowIndex + 1][colIndex]);
  }

  if (colIndex > 0) {
    neighbours.push(grid[rowIndex][colIndex - 1]);
  }
  if (colIndex < GRAPH_WIDTH - 1) {
    neighbours.push(grid[rowIndex][colIndex + 1]);
  }

  return neighbours.filter((neighbor) => !neighbor.isVisited);
};

export const updateUnvisitedNeighbours = (node: Node, grid: Node[][]) => {
  const neighbours = getUnvisitedNeighbours(node, grid);

  for (const neighbor of neighbours) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

// this function only works AFTER the algorithm was ran
export function getShortestPathNodes(finishNode: Node) {
  const nodes: Node[] = [];

  let currentNode: Node | null = finishNode;
  while (currentNode !== null) {
    nodes.unshift(currentNode);

    currentNode = currentNode.previousNode;
  }

  return nodes;
}
