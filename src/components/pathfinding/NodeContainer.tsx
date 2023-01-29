import { Node } from "../../types/node";
import { FC } from "react";
import NodeItem from "./Node";

interface NodeContainerProps {
  nodes: Array<Array<Node>>;
}

const NodeContainer: FC<NodeContainerProps> = ({ nodes }) => {
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
