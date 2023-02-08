import Main from "./components/layout/Main";
import Header from "./pages/Header";
import Guide from "./pages/Guide";
import NodeContainer from "./components/pathfinding/NodeContainer";
import PopupContainer from "./components/popup/PopupContainer";

const App = () => {
  return (
    <Main>
      <PopupContainer />
      <Header />
      <Guide />
      <NodeContainer />
    </Main>
  );
};

export default App;
