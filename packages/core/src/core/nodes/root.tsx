import { Handle, NodeProps, Position } from 'reactflow'
import dag from '../dag'
import { FC } from 'react'

export const RootNode: FC<NodeProps> = ({ id }) => (
  <div className='w-48 rounded-md p-2 bg-zinc-400'>
    {id}
    <Handle
      className='rounded w-3 h-3 pointer-events-none bg-blue-400'
      type='source'
      id={id}
      onConnect={(connection) =>
        dag.mergeEdge(connection.source, connection.target)
      }
      position={Position.Right}
    />
  </div>
)
