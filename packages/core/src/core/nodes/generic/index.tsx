import { ChangeEvent, FC, useState } from 'react'
import { Connection, Handle, Position } from 'reactflow'

import dag from '../../dag'

import { AttributesRenderer } from '../../../renderer/node/attributes'
import { AppNode } from '../../../shared/store/types'

const mapPropsToParameters = ({ class_params, func_params }: ModuleNode) => ({
  class_params,
  func_params
})

const generateKey = ({ className, functionName }: ModuleNode) =>
  `${className}/${functionName}`

export const GenericNode: FC<AppNode> = ({ id, data }) => {
  const { className, functionName } = data

  const key = generateKey(data)


  const generator = dag.getNodeAttributes(id)


  const parameters = mapPropsToParameters(data)

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const parameter = generator.getParameter(target.id)

    parameter.set(target.name, target.value)
  }

  const onConnect = (connection: Connection) => {
    dag.addEdge(connection.source, connection.target, { key, name: connection.sourceHandle! })

    generator.connections.set(connection.sourceHandle!, connection.target!)
  }

  return (
    <div className='bg-zinc-700 w-72 text-zinc-300 font-mono outline-1 outline-zinc-500 rounded-md'>
      <Handle
        type='target'
        id={id}
        position={Position.Left}
        className='pointer-events-none h-2 w-2 rounded-sm bg-blue-400'
      />

      <div className='text-xs text-zinc-300 p-2 font-mono bg-zinc-900 w-full'>
        <p>{id}</p>
        <p>{data.key}</p>
        <p>{className}</p>
        <p>{functionName}</p>
      </div>

      {Object.entries(parameters).map(([key, attributes]) => (
        <AttributesRenderer
          key={key}
          attributeId={key}
          attributes={attributes}
          onChange={onChange}
          onConnect={onConnect}
        />
      ))}

      <Handle
        id='next_id'
        type='source'
        position={Position.Right}
        onConnect={onConnect}
        className='pointer-events-none h-2 w-2 rounded-sm bg-green-400'
        style={{
          top: '30%'
        }}
      />

      <Handle
        id='if_error'
        type='source'
        position={Position.Right}
        onConnect={onConnect}
        className='pointer-events-none h-2 w-2 rounded-sm bg-red-500'
        style={{
          top: '75%'
        }}
      />
    </div>
  )
}
