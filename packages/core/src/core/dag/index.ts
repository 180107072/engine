import { DirectedGraph } from 'graphology'
import { NodeGenerator } from '../engine/generators/node'

const dag = new DirectedGraph<NodeGenerator, DAG.Edge, DAG.Graph>()

export default dag
