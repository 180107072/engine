import { Parameter } from './parameter'

export class Connections<T> extends Map<string, T> {
  toJSON() {
    const entries = this.entries()

    const result: Record<string, T> = {}

    let next = entries.next()

    while (!next.done) {
      const [key, value] = next.value

      result[key] = value

      next = entries.next()
    }

    return result
  }
}

export class NodeGenerator {
  parameters: Map<string, Parameter> = new Map();

  id: string

  key!: string

  connections: Connections<string>;

  constructor(id: string, ...defaultParameters: string[]) {
    this.id = id
    this.connections = new Connections()

    for (const name of defaultParameters) {
      this.parameters.set(name, new Parameter(name))
    }
  }

  getParameter(name: string) {
    const param = this.parameters.get(name)

    if (!param) throw Error('Parameter not recognized')

    return param
  }

  intoBlock() {
    const copy = new Map<string, Record<string, string>>()

    this.parameters.forEach((parameter, key) => {
      copy.set(key, parameter.toJSON())
    })

    const result = Object.fromEntries(copy.entries())

    return { ...result, ...this.connections.toJSON(), id: this.id, }
  }

}
