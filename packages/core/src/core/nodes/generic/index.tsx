import { ChangeEvent, FC, useCallback } from 'react'
import { Connection, Handle, Position } from 'reactflow'

import dag from '../../dag'

import { AttributesRenderer } from '../../../renderer/node/attributes'
import { AppNode } from '../../../shared/store/types'

export const GenericNode: FC<AppNode> = ({ id, data }) => {
  const { className, functionName, func_params, class_params } = data

  const onChange = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    console.log(target)
    // dag.setNodeAttribute(id, target.name, target.value);
  }, [])

  const onConnect = useCallback(
    (connection: Connection) => {
      dag.mergeEdge(connection.source, connection.target, data)
    },
    [data]
  )

  return (
    <div className='bg-zinc-700 w-72 text-zinc-300 font-mono outline-1 outline-zinc-500 overflow-hidden rounded-md'>
      <Handle
        type='target'
        id={id}
        position={Position.Left}
        className='pointer-events-none h-2 w-2 rounded-sm'
        style={{
          background: 'rgb(96 165 250)'
        }}
      />

      <div className='text-xs text-zinc-300 p-2 font-mono bg-zinc-900 w-full'>
        <p>{id}</p>
        <p>{data.key}</p>
        <p>{className}</p>
        <p>{functionName}</p>
      </div>

      <AttributesRenderer attributes={class_params} onChange={onChange} />
      <AttributesRenderer attributes={func_params} onChange={onChange} />

      <Handle
        id='next_id'
        type='source'
        position={Position.Right}
        onConnect={onConnect}
        className='pointer-events-none h-2 w-2 rounded-sm'
        style={{
          background: '#0ea5e9',
          top: '30%'
        }}
      />

      <Handle
        id='if_error'
        type='source'
        position={Position.Right}
        onConnect={onConnect}
        className='pointer-events-none h-2 w-2 rounded-sm'
        style={{
          background: 'rgb(248 113 113)',
          top: '75%'
        }}
      />
    </div>
  )
}
