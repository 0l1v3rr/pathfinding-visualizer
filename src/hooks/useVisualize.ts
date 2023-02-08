import { AlgorithmType } from "../const/algorithms";
import { useMemo } from "react";
import { useDijkstras } from "./useDijkstras";
import { useBfs } from "./useBfs";
import { useDfs } from "./useDfs";

export const useVisualize = (algorithm: string) => {
  const algorithmType = algorithm as AlgorithmType;
  //    ^?
  const dijkstra = useDijkstras();
  const bfs = useBfs();
  const dfs = useDfs();

  return useMemo(() => {
    if (algorithmType === "Dijkstra's Algorithm") return dijkstra;
    if (algorithmType === "Breadth-first Search") return bfs;
    if (algorithmType === "Depth-first Search") return dfs;

    return dijkstra;
  }, [algorithmType, dijkstra, bfs, dfs]);
};
