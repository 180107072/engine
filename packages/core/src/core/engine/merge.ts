import { NodeGenerator } from './generators/node'

export const mergeWithReferences = (
  connectedNodes: NodeGenerator[],
  loopConnections: Map<string, string>
) => {
  const references = loopConnections.keys()

  let next = references.next()

  while (!next.done) {
    const referee = next.value

    for (const { connections, id } of connectedNodes) {
      if (id === referee) {
        connections.set('reference', loopConnections.get(referee)!)
      }
    }

    next = references.next()
  }

  return connectedNodes
}
