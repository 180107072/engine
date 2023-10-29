import { createWithEqualityFn } from 'zustand/traditional'
import {
  Connection,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge
} from 'reactflow'

import { defaultState } from './default'
import { ReactFlowState } from './types'
import { temporal } from 'zundo'
import dag from '../../core/dag'
import { createNodeAttributes } from '../../core/dag/create-node-attributes'

export const useNodesApi = createWithEqualityFn(
  temporal<ReactFlowState>((set, get) => ({
    ...defaultState,
    onNodesChange: (changes: NodeChange[]) =>
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      }),
    onEdgesChange: (changes: EdgeChange[]) =>
      set({
        edges: applyEdgeChanges(changes, get().edges)
      }),
    onConnect: (connection: Connection) =>
      set({
        edges: addEdge({ ...connection, animated: true }, get().edges)
      }),
    addNode: (node: Node) => {
      dag.addNode(node.id, createNodeAttributes(node.id, node.data))

      set({
        nodes: get().nodes.concat(node)
      })
    },
    updateEdges: (edges: Edge[]) =>
      set({
        edges: get().edges.concat(edges)
      }),
    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges })
  })),

  Object.is
)
