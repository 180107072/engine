import { createWithEqualityFn } from "zustand/traditional";
import {
  Connection,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from "reactflow";

import { defaultState } from "./default";
import { ReactFlowState } from "./types";

export const createAppStore = createWithEqualityFn<ReactFlowState>(
  (set, get) => ({
    ...defaultState,
    onNodesChange: (changes: NodeChange[]) => {
      const nodes = get().nodes;

      set({
        nodes: applyNodeChanges(changes, nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge({ ...connection, animated: true }, get().edges),
      });
    },
    addNode: (node: Node) => {
      set({
        nodes: get().nodes.concat(node),
      });
    },

    updateEdges: (edges: Edge[]) => {
      set({
        edges: get().edges.concat(edges),
      });
    },
    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),
  }),

  Object.is
);
