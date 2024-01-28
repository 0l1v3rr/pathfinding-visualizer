import { useState } from "react";
import NodeItem from "./Node";
import { useNodeContext } from "../../context/NodeContext";

const NodeContainer = () => {
  const { nodes } = useNodeContext();
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

  return (
    <section
      onMouseLeave={() => setIsMousePressed(false)}
      className="mx-2 flex flex-col border border-slate-300/20 shadow-md sm:mx-4 md:mx-10"
    >
      {nodes.map((rows, i) => (
        <div className="flex" key={i}>
          {rows.map((node, j) => (
            <NodeItem
              key={`${i}-${j}`}
              node={node}
              isMousePressed={isMousePressed}
              setIsMousePressed={(val) => setIsMousePressed(val)}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default NodeContainer;
