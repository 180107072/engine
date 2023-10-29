namespace DAG {
  export type Edge = {
    key: string
    name: string
  }

  export type Node = {
    key: string
  } & ModuleNode

  export type Graph = Record<string, string>
}
