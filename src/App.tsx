import Main from "./components/layout/Main";
import Header from "./pages/Header";
import { useState, useCallback } from "react";
import { algorithms } from "./const/algorithms";
import Guide from "./pages/Guide";
import NodeContainer from "./components/pathfinding/NodeContainer";
import { generateEmptyGraph, Node } from "./types/node";

const App = () => {
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
    <Main>
      <Header
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={(val) => setSelectedAlgorithm(val)}
      />

      <Guide />

      <NodeContainer nodes={nodes} updateNode={updateNode} />
    </Main>
  );
};

export default App;
