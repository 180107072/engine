import { NodeGenerator } from './generators/node'

export const mergeWithReferences = (
  connectedNodes: NodeGenerator[],
  referenceConnections: Map<string, string>
) => {
  const iterator = referenceConnections.keys()

  let next = iterator.next()

  while (!next.done) {
    const pointer = next.value

    for (const { connections, id } of connectedNodes) {
      if (id !== pointer) continue
      const reference = referenceConnections.get(pointer)

      if (reference) connections.set('reference', reference)
    }

    next = iterator.next()
  }

  return connectedNodes
}
