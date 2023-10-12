import dag from '../dag'
import { dfsFromNode } from 'graphology-traversal'
import { NODES } from '../nodes/definitions'

/**
 * There may be errors
 * If the cycle is the last node
 * Some spaghetti connection
 */

export const traverse = (
  root = NODES.ROOT,
  keys = ['loop/for_each']
): [ReturnType<typeof dag.getNodeAttributes>[], Map<string, string>] => {
  console.log('Start: ', performance.now())

  const loops: string[] = []

  const connections = new Map<string, string>()

  const nodes: ReturnType<typeof dag.getNodeAttributes>[] = []

  const findLast = (node: string) =>
    dag.findEdge((_edge, _attrs, source, _target) => source === node) ===
    undefined

  const startFromNode = (start: string) => {
    dfsFromNode(dag, start, (node, attrs) => {
      const edge = keys.includes(attrs.key)
      /**
       * Found next loop in graph
       */
      if (edge) {
        /**
         * If loops are nested, add connection and break dfs loop
         */
        if (node !== start) {
          connections.set(node, start)

          return true
        }

        loops.push(node)
      }
    })
  }

  /**
   * Traverse through graph to find loops with permission
   */
  dfsFromNode(dag, root, (node, attrs) => {
    if (node === root) return false

    const edge = keys.includes(attrs.key)

    nodes.push(attrs)

    /**
     * If loop found, start new loop from its direction
     */
    if (edge) {
      loops.push(node)

      startFromNode(node)
    }

    /**
     * Last node in some direction goes to latest loop
     */
    const isLast = findLast(node)

    if (isLast) {
      connections.set(node, loops[loops.length - 1])
    }
  })

  console.log(connections)
  console.log('End: ', performance.now())

  return [nodes, connections]
}
