import { topologicalGenerations } from "graphology-dag";
import dag from "../dag";

export const toJSON = () => {
  const nodes = topologicalGenerations(dag);

  console.log(nodes);
};
