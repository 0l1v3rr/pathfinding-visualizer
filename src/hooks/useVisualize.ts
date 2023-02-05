import { AlgorithmType } from "../const/algorithms";
import { useMemo } from "react";
import { useDijkstras } from "./useDijkstras";
import { useBfs } from "./useBfs";

export const useVisualize = (algorithm: string) => {
  const algorithmType = algorithm as AlgorithmType;
  //    ^?
  const dijkstra = useDijkstras();
  const bfs = useBfs();

  return useMemo(() => {
    if (algorithmType === "Dijkstra's Algorithm") return dijkstra;
    if (algorithmType === "Breadth-first Search") return bfs;

    return dijkstra;
  }, [algorithmType, dijkstra, bfs]);
};
