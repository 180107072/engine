import { NodeGenerator } from "../generators/node"

class PythonRPAModuleBuilder {
  config: any;

  result: Record<string, any> = {}

  nodes: NodeGenerator[]

  loops = ['loop/foreach']

  constructor(nodes: NodeGenerator[], config: any) {
    this.config = config
    this.nodes = nodes
  }

  build() {
    for (const node of this.nodes) {
      const block = node.intoBlock()

      console.log(block)
    }
  }

  buildDefaultNode(node: NodeGenerator) {
  }

  fromReference(node: NodeGenerator) {
  }

  buildLoops() { }

  buildConditions() { }


}


export const run = async (nodes: NodeGenerator[], shared: any) => {
  const builder = new PythonRPAModuleBuilder(nodes, shared)
  builder.build()
}
