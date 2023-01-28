import Main from "./components/layout/Main";
import Header from "./pages/Header";
import { useState } from "react";
import { algorithms } from "./const/algorithms";

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    algorithms[0]
  );

  return (
    <Main>
      <Header
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={(val) => setSelectedAlgorithm(val)}
      />

      <h1>hi</h1>
    </Main>
  );
};

export default App;
