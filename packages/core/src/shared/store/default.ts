import { ReactFlowStore } from "./types";

export const defaultState: ReactFlowStore = {
  nodes: [
    {
      id: "root",
      type: "root",
      position: { x: 0, y: 0 },
      data: {},
    },
  ],
  edges: [],
};
