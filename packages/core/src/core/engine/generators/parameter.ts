export class Parameter extends Map<string, string> {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }

  toJSON() {
    const entries = this.entries()

    const result: Record<string, string> = {}

    let next = entries.next()

    while (!next.done) {
      const [key, value] = next.value

      result[key] = value

      next = entries.next()
    }

    return {
      [this.name]: result
    }
  }
}
