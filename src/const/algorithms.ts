export const algorithms = [
  "Dijkstra's Algorithm",
  // "A* Search",
  // "Greedy Best-first Search",
  // "Swarm Algorithm",
  "Breadth-first Search",
  "Depth-first Search",
] as const;

export type AlgorithmType = (typeof algorithms)[number];
