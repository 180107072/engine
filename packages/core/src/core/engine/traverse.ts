import dag from '../dag'
import { dfsFromNode } from 'graphology-traversal'
import { NODES } from '../nodes/definitions'

export const traverse = (
  root = NODES.ROOT,
  keys = ['loop/for_each']
): [ReturnType<typeof dag.getNodeAttributes>[], Map<string, string>] => {
  let ref: string

  const outMap = new Map<string, string>()
  const childMap = new Map<string, string>()

  const connections = new Map<string, string>()

  const nodes: ReturnType<typeof dag.getNodeAttributes>[] = []

  const addConnection = (from: string, to: string) => {
    if (!from || !to) return

    if (from === to) return

    connections.set(from, to)

    if (outMap.has(from)) {
      const out = outMap.get(from)

      childMap.set(from, out!)
    }
  }

  const collectNeighbours = (node: string) => {
    /**
     * TODO: rewrite it
     */
    const origin = dag.getNodeAttributes(ref)

    const outputs = origin.connections.keys()

    let next = outputs.next()

    while (!next.done) {
      const id = origin.connections.get(next.value)

      if (id === node) return next.value

      next = outputs.next()
    }
  }

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
          addConnection(node, snapshot)

          return true
        }

        ref = node
      }
    })
  }

  console.clear()

  /**
   * Traverse through graph to find loops with permission
   */
  dfsFromNode(dag, root, (node, instance) => {
    if (node === root) return false

    const reference = keys.includes(instance.key)

    nodes.push(instance)

    if (ref) {
      const out = collectNeighbours(node)
      if (out) outMap.set(node, out)
    }

    /**
     * If loop found, start new loop from its direction
     */
    if (reference) {
      ref = node

      capture(node)
    }

    if (instance.connections.size === 0) {
      addConnection(node, ref)
    }
  })

  console.log(childMap)

  return [nodes, connections]
}
