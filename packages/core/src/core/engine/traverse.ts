import dag from '../dag'
import { dfsFromNode } from 'graphology-traversal'
import { NODES } from '../nodes/definitions'

/**
 * There may be errors
 * If the cycle is the last node
 */

export const traverse = (
  root = NODES.ROOT,
  keys = ['loop/for_each']
): [ReturnType<typeof dag.getNodeAttributes>[], Map<string, string>] => {
  const refs: string[] = []

  const connections = new Map<string, string>()

  const nodes: ReturnType<typeof dag.getNodeAttributes>[] = []

  const findLast = (node: string) =>
    dag.findEdge((_edge, _attrs, source, _target) => source === node) ===
    undefined

  const capture = (snapshot: string) => {
    dfsFromNode(dag, snapshot, (node, instance) => {
      const reference = keys.includes(instance.key)
      /**
       * Found next loop in graph
       */
      if (reference) {
        /**
         * If loops are nested, add connection and break dfs loop
         */
        if (node !== snapshot) {
          connections.set(node, snapshot)

          return true
        }

        refs.push(node)
      }
    })
  }

  /**
   * Traverse through graph to find loops with permission
   */
  dfsFromNode(dag, root, (node, instance) => {
    if (node === root) return false

    const reference = keys.includes(instance.key)

    nodes.push(instance)

    /**
     * If loop found, start new loop from its direction
     */
    if (reference) {
      refs.push(node)

      capture(node)
    }

    /**
     * Last node in some direction goes to latest loop
     */
    const isLast = findLast(node)

    if (isLast) {
      connections.set(node, refs[refs.length - 1])
    }
  })

  return [nodes, connections]
}
