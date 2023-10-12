import { Parameter } from './parameter'

export class NodeGenerator {
  parameters: Parameter[]

  id: string

  key!: string

  connections = new Map<string, string>()

  constructor(id: string, ...defaultParameters: string[]) {
    this.id = id
    this.parameters = defaultParameters.map(
      (parameter) => new Parameter(parameter)
    )
  }

  getParameter(name: string) {
    const param = this.parameters.find((param) => param.name === name)

    if (!param) throw Error('Parameter not recognized')

    return param
  }

  addConnection(type: string, id: string) {
    this.connections.set(type, id)
  }
}
