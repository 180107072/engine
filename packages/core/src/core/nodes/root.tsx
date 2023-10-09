import { Handle, NodeProps, Position } from "reactflow";
import dag from "../dag";
import { FC } from "react";

export const RootNode: FC<NodeProps> = () => {
  return (
    <div className="bg-zinc-300 w-48 rounded-md p-2">
      ROOT
      <Handle
        className="rounded w-3 h-3 pointer-events-none"
        type="source"
        id="root"
        onConnect={(connection) => {
          dag.mergeEdge(connection.source, connection.target);
        }}
        position={Position.Right}
        style={{ background: "rgb(74 222 128)" }}
      />
    </div>
  );
};
