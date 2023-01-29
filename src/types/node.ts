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

  res[halfHeight][Math.floor(GRAPH_WIDTH / 4)] = {
    ...res[0][0],
    isStartNode: true,
  };
  res[halfHeight][Math.floor((GRAPH_WIDTH / 4) * 3)] = {
    ...res[0][1],
    isTargetNode: true,
  };

  return res;
};
