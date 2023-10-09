import { DragEvent, memo, useState } from 'react'
import { ChevronDown } from '../../shared/ui/icons/chevron-down'
import { ChevronRight } from '../../shared/ui/icons/chevron-right'
import { useModules } from '../hooks/useModules'
import { group } from '../utils/group'

const onDragStart = (event: DragEvent, key: string) => {
  event.dataTransfer.setData('application/reactflow', key)
  event.dataTransfer.effectAllowed = 'move'
}

type CategoryProps = {
  features: ModuleNode[]
  category: string
}

const Category = memo(({ features, category }: CategoryProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className='w-full bg-zinc-900 font-mono  flex gap-1 rounded-md px-1 border border-zinc-950 flex-col items-start'>
      <button
        className='flex justify-center  items-center w-full'
        onClick={() => setOpen(!isOpen)}
      >
        {category}
        <span className='ml-auto w-fit'>
          {isOpen ? (
            <ChevronDown className='w-3 h-3' />
          ) : (
            <ChevronRight className='w-3 h-3' />
          )}
        </span>
      </button>

      {isOpen ? (
        <div className='flex flex-wrap py-1 gap-1 items-start w-full'>
          {features.map((node, i) => (
            <button
              className='bg-zinc-900 border p-1 border-zinc-500 rounded-sm hover:bg-zinc-300 hover:text-zinc-900'
              key={`${node.functionName}-${node.className}-${i}`}
              draggable
              onDragStart={(event: DragEvent) =>
                onDragStart(event, JSON.stringify(node))
              }
            >
              {node.functionName}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
})

const Sidebar = () => {
  const { data: modules } = useModules()

  if (!modules) return null

  return (
    <aside className='bg-zinc-950 overflow-auto p-1 text-zinc-300 flex text-xs flex-col h-full'>
      {Object.entries(modules).map(([name, module]) => {
        return (
          <div key={name}>
            <p className='m-1 rounded px-1 bg-zinc-800'>{name}</p>
            {Object.entries(group(module)).map(([name, features]) => {
              return <Category key={name} category={name} features={features} />
            })}
          </div>
        )
      })}
    </aside>
  )
}

export default Sidebar
