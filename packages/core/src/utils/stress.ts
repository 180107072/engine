import dag from "../core/dag";
import { initialValues } from "../core/nodes/standalone/initial";

export function createNodesAndEdges(xNodes = 10, yNodes = 10) {
  const nodes = [];
  const edges = [];
  let nodeId = 1;
  let recentNodeId = null;

  for (let y = 0; y < yNodes; y++) {
    for (let x = 0; x < xNodes; x++) {
      const position = { x: x * 500, y: y * 500 };
      const data = { key: "loop/for_each", ...initialValues };
      const id = `stress-${nodeId.toString()}`;
      const node = {
        type: "generic",
        id,
        data,
        position,
      };
      nodes.push(node);

      dag.addNode(id);

      if (recentNodeId && nodeId <= xNodes * yNodes) {
        const source = `stress-${recentNodeId.toString()}`;
        const target = `stress-${nodeId.toString()}`;
        edges.push({
          id: `${x}-${y}`,
          source,
          target,
        });

        dag.mergeEdge(source, target, { key: "loop/for_each" });
      }

      recentNodeId = nodeId;
      nodeId++;
    }
  }

  return { nodes, edges };
}
