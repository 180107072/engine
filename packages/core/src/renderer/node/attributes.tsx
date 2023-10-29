import { ChangeEvent, FC, useMemo } from 'react'
import { Connection, Handle, Position } from 'reactflow'

export const AttributesRenderer: FC<{
  attributes: Record<string, ArgumentProps>
  attributeId: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onConnect: (connection: Connection) => void
}> = ({ attributes, attributeId, onChange, onConnect }) => {
  const entries = useMemo(() => Object.entries(attributes), [attributes])

  if (!entries.length) return null

  return (
    <div className='flex flex-col gap-1 text-xs p-2'>
      {entries.map(([key, value]) =>
        value === null ? null : (
          <span key={key} className='flex gap-2'>
            <span
              title={key}
              className='whitespace-nowrap w-16 text-ellipsis'
            >
              {key}
            </span>
            <input
              name={key}
              id={attributeId}
              placeholder={value.example}
              onChange={onChange}
              className='bg-zinc-800 px-1 rounded flex-1'
            />

            {value.output ? <Handle
              id={key}
              type='source'
              position={Position.Right}
              className='pointer-events-none relative transform-none top-auto h-2 w-2 rounded-sm bg-blue-400'
              onConnect={onConnect}
            /> : null}
          </span>
        )
      )}
    </div>
  )
}
