import { useState, DragEvent } from 'react'
import ReactFlow, { Background, ReactFlowInstance } from 'reactflow'
import { nanoid } from 'nanoid'

import { shallow } from 'zustand/shallow'

import 'reactflow/dist/base.css'
import 'allotment/dist/style.css'
import dag from '../../core/dag'

import { NODES, NODE_TYPES } from '../../core/nodes/definitions'
import { createAppStore } from '../../shared/store/create'

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
}

export const Editor = () => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    createAppStore((s) => s, shallow)

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi)

  const onDrop = async (event: DragEvent) => {
    event.preventDefault()

    if (!reactFlowInstance) return

    const id = nanoid()

    const transferData = event.dataTransfer!.getData('application/reactflow')

    const node: ModuleNode = JSON.parse(transferData)

    const key = `${node.className}/${node.functionName}`

    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY
    })

    const data = { key, ...node }

    const newNode = {
      id,
      type: NODES.GENERIC,
      position,
      data
    }

    dag.addNode(id, data)
    addNode(newNode)
  }

  return (
    <ReactFlow
      nodeTypes={NODE_TYPES}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
      onlyRenderVisibleElements
    >
      <Background className='bg-zinc-900' />
    </ReactFlow>
  )
}
