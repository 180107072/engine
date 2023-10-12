import { NodeGenerator } from '../engine/generators/node'

export const createNodeAttributes = (id: string, node: ModuleNode) => {
  const { class_params, func_params } = node

  const attribute = new NodeGenerator(
    id,
    ...Object.keys({ class_params, func_params })
  )

  const { className, functionName } = node

  attribute.key = `${className}/${functionName}`

  return attribute
}
