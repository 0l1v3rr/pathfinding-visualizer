import { AlgorithmType } from "../const/algorithms";
import { useMemo } from "react";
import { useDijkstras } from "./useDijkstras";

export const useVisualize = (algorithm: string) => {
  const algorithmType = algorithm as AlgorithmType;
  //    ^?
  const dijkstra = useDijkstras();

  return useMemo(() => {
    if (algorithmType === "Dijkstra's Algorithm") return dijkstra;
    return dijkstra;
  }, [dijkstra, algorithmType]);
};
