import dag from "../dag";
import { dfsFromNode } from "graphology-traversal";
import { NODES } from "../nodes/definitions";

/**
 * There may be errors
 * If the cycle is the last node
 * Some spaghetti connection
 */

export const traverse = (
  root = NODES.ROOT,
  keys = ["loop/for_each"]
): [Record<string, ReturnType<typeof dag.getNodeAttributes>>, string[][]] => {
  console.log("Start: ", performance.now());

  const loops: string[] = [];

  const connections: string[][] = [];

  const nodes: Record<string, ReturnType<typeof dag.getNodeAttributes>> = {};

  const findLoop = (key: string) =>
    dag.findEdge(
      (_edge, attrs, _source, target) =>
        target === key && keys.includes(attrs.key)
    );

  const findLast = (node: string) =>
    dag.findEdge((_edge, _attrs, source, _target) => source === node) ===
    undefined;

  const startFromNode = (node: string) => {
    dfsFromNode(dag, node, (key) => {
      const edge = findLoop(key);
      /**
       * Found next loop in graph
       */
      if (edge) {
        const source = dag.source(edge);

        /**
         * If loops are nested, add connection and break dfs loop
         */
        if (source !== node) {
          connections.push([source, node]);
          return true;
        }

        loops.push(source);
      }
    });
  };

  /**
   * Traverse through graph to find loops with permission
   */
  dfsFromNode(dag, root, (node, attrs) => {
    const edge = findLoop(node);

    nodes[node] = attrs;

    /**
     * If loop found, start new loop from its direction
     */
    if (edge) {
      const source = dag.source(edge);

      loops.push(source);

      startFromNode(source);
    }

    /**
     * Last node in some direction goes to latest loop
     */
    const isLast = findLast(node);

    if (isLast) {
      connections.push([loops[loops.length - 1], node]);
    }
  });

  console.log("End: ", performance.now());

  return [nodes, connections.filter(([v1, v2]) => v1 && v2)];
};
