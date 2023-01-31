import { createContext, FC, ReactElement, useCallback, useState } from "react";
import { algorithms } from "../const/algorithms";
import { generateEmptyGraph, Node } from "../types/node";

interface NodeProviderProps {
  children: ReactElement;
}

export interface NodeContextType {
  nodes: Array<Array<Node>>;
  updateNode: (row: number, col: number, newNode: Node) => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
}

export const NodeContext = createContext<NodeContextType | null>(null);

export const NodeProvider: FC<NodeProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<Array<Array<Node>>>(generateEmptyGraph());
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    algorithms[0]
  );

  const updateNode = useCallback((row: number, col: number, newNode: Node) => {
    setNodes((prev) => {
      const newArr = [...prev];
      newArr[row][col] = { ...newNode };
      return newArr;
    });
  }, []);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        updateNode,
        selectedAlgorithm,
        setSelectedAlgorithm,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
