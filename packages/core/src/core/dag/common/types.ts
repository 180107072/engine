namespace DAG {
  export type Edge = {
    key: string
  }

  export type Node = {
    key: string
  } & ModuleNode

  export type Graph = Record<string, string>
}
