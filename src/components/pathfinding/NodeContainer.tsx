import { useContext } from "react";
import NodeItem from "./Node";
import { NodeContext, NodeContextType } from "../../context/NodeContext";

const NodeContainer = () => {
  const { nodes } = useContext(NodeContext) as NodeContextType;
  return (
    <section className="flex flex-col mx-10 shadow-md border border-slate-300/20">
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
