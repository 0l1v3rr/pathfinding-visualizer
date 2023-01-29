export interface Node {
  rowIndex: number;
  colIndex: number;
  isWall: boolean;
  isStartNode: boolean;
  isTargetNode: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
}

export const GRAPH_WIDTH = 40;
export const GRAPH_HEIGHT = 15;

export const generateEmptyGraph = (): Node[][] => {
  const res: Node[][] = [];

  for (let row = 0; row < GRAPH_HEIGHT; row++) {
    res[row] = [];
    for (let col = 0; col < GRAPH_WIDTH; col++) {
      res[row][col] = {
        colIndex: col,
        rowIndex: row,
        isShortestPath: false,
        isStartNode: false,
        isTargetNode: false,
        isVisited: false,
        isWall: false,
      };
    }
  }

  const halfHeight = Math.floor(GRAPH_HEIGHT / 2);
  const startCol = Math.floor(GRAPH_WIDTH / 4);
  const targetCol = Math.floor((GRAPH_WIDTH / 4) * 3);

  res[halfHeight][startCol] = {
    ...res[halfHeight][startCol],
    isStartNode: true,
  };
  res[halfHeight][targetCol] = {
    ...res[halfHeight][targetCol],
    isTargetNode: true,
  };

  return res;
};
