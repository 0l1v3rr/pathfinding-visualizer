import Main from "./components/layout/Main";
import Header from "./pages/Header";
import { useState } from "react";
import { algorithms } from "./const/algorithms";
import Guide from "./pages/Guide";

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

      <Guide />
    </Main>
  );
};

export default App;
