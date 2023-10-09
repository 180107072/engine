import { useRef } from 'react'
import { chart } from './chart'
import dag from '../../core/dag'

export const Snapshot = () => {
  const ref = useRef<HTMLDivElement>(null)

  const createSnapshot = () => {
    const graph = dag.export()
    const data = {
      nodes: graph.nodes.map((n) => ({ id: n.key, ...n })),
      links: graph.edges
    }

    const element = chart(data)

    if (!ref.current || !element) return

    ref.current.appendChild(element)
  }

  return (
    <>
      <button
        onClick={createSnapshot}
        className='left-0 top-0 z-50 m-2 w-24 bg-zinc-200 rounded font-extrabold'
      >
        Snapshot
      </button>

      <div
        ref={ref}
        className='h-full bg-zinc-900 [&>*]:border [&>*]:border-zinc-950 overflow-auto'
      />
    </>
  )
}
