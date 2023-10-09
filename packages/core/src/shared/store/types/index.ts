import * as RF from 'reactflow'

export interface AppNode extends RF.Node {
  data: { key: string } & ModuleNode
}
export type ReactFlowStore = {
  nodes: AppNode[]
  edges: RF.Edge[]
}

export type ReactFlowActions = {
  addNode: (node: RF.Node) => void
  setNodes: (nodes: RF.Node[]) => void
  setEdges: (edges: RF.Edge[]) => void
  updateEdges: (edges: RF.Edge[]) => void
  onNodesChange: RF.OnNodesChange
  onEdgesChange: RF.OnEdgesChange
  onConnect: RF.OnConnect
}

export type ReactFlowState = ReactFlowActions & ReactFlowStore
