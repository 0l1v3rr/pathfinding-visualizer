import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { algorithms } from "../const/algorithms";
import { generateEmptyGraph, Node } from "../types/node";

interface NodeProviderProps {
  children: ReactElement;
}

export interface NodeContextType {
  nodes: Array<Array<Node>>;
  updateNode: (row: number, col: number, newNode: Node) => void;
  markNodeAsVisited: (node: Node) => void;
  markNodeAsShortestPath: (node: Node) => void;
  updateWallStatus: (node: Node, isWall: boolean) => void;
  clearWalls: () => void;
  resetBoard: () => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: Dispatch<SetStateAction<string>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  isRan: boolean;
  setIsRan: Dispatch<SetStateAction<boolean>>;
}

export const NodeContext = createContext<NodeContextType | null>(null);

export function useNodeContext(): NodeContextType {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodeContext can only be used inside the NodeProvider");
  }

  return context;
}

export const NodeProvider: FC<NodeProviderProps> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isRan, setIsRan] = useState(false);
  const [nodes, setNodes] = useState<Array<Array<Node>>>(
    structuredClone(generateEmptyGraph())
  );
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

  const clearWalls = () => {
    setIsRan(false);
    setNodes((prev) => {
      return prev.map((row) =>
        row.map((node) => ({
          ...node,
          isWall: false,
          isVisited: false,
          isShortestPath: false,
        }))
      );
    });
  };

  const markNodeAsVisited = useCallback(
    (node: Node) =>
      updateNode(node.rowIndex, node.colIndex, { ...node, isVisited: true }),
    [updateNode]
  );

  const markNodeAsShortestPath = useCallback(
    (node: Node) =>
      updateNode(node.rowIndex, node.colIndex, {
        ...node,
        isVisited: false,
        isShortestPath: true,
      }),
    [updateNode]
  );

  const updateWallStatus = (node: Node, isWall: boolean) =>
    updateNode(node.rowIndex, node.colIndex, { ...node, isWall });

  const resetBoard = () => {
    setNodes(structuredClone(generateEmptyGraph()));
    setIsRan(false);
  };

  return (
    <NodeContext.Provider
      value={{
        nodes,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isRunning,
        setIsRunning,
        isRan,
        setIsRan,
        updateNode,
        updateWallStatus,
        clearWalls,
        resetBoard,
        markNodeAsVisited,
        markNodeAsShortestPath,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
