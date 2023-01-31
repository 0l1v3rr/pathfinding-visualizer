import Main from "./components/layout/Main";
import Header from "./pages/Header";
import Guide from "./pages/Guide";
import NodeContainer from "./components/pathfinding/NodeContainer";

const App = () => {
  return (
    <Main>
      <Header />
      <Guide />
      <NodeContainer />
    </Main>
  );
};

export default App;
