import { NodeTypes } from "reactflow";
import { GenericNode } from "./generic";
import { RootNode } from "./root";

export enum NODES {
  GENERIC = "generic",
  ROOT = "root",
}

export enum LOOPS {
  FOR_EACH = "loop/for_each",
}

export const NODE_TYPES: NodeTypes = {
  generic: GenericNode,
  root: RootNode,
};
