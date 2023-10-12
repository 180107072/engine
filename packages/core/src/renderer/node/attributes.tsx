import { ChangeEvent, FC, useMemo } from 'react'

export const AttributesRenderer: FC<{
  attributes: Record<string, ArgumentProps>
  attributeId: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ attributes, attributeId, onChange }) => {
  const entries = useMemo(() => Object.entries(attributes), [attributes])

  if (!entries.length) return null

  return (
    <div className='flex flex-col gap-1 text-xs p-2'>
      {entries.map(([key, value]) => {
        if (value === null) {
          return null
        }
        return (
          <span
            key={key}
            style={{ display: 'grid', gridTemplateColumns: '30% 70%' }}
          >
            <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
              {key}
            </span>
            <input
              name={key}
              id={attributeId}
              placeholder={value.example}
              onChange={onChange}
              className='bg-zinc-800 px-1 rounded'
            />
          </span>
        )
      })}
    </div>
  )
}
