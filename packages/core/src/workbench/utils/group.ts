import { Feature, Module } from '../api/modulesApi'

export const group = (module: Module) => {
  const grouped: Record<string, Feature[]> = {}

  for (const node of module.core) {
    if (!grouped[node.className]) {
      grouped[node.className] = []
    }
    grouped[node.className].push(node)
  }

  return grouped
}
