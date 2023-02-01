import { useContext } from "react";
import NodeItem from "./Node";
import { NodeContext, NodeContextType } from "../../context/NodeContext";

const NodeContainer = () => {
  const { nodes } = useContext(NodeContext) as NodeContextType;

  return (
    <section className="mx-2 flex flex-col border border-slate-300/20 shadow-md sm:mx-4 md:mx-10">
      {nodes.map((rows, i) => (
        <div className="flex" key={i}>
          {rows.map((node, j) => (
            <NodeItem node={node} key={`${i}-${j}`} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default NodeContainer;
