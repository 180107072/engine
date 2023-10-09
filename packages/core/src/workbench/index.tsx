import { traverse } from '../core/engine/traverse'

import { Allotment } from 'allotment'

import 'reactflow/dist/base.css'
import 'allotment/dist/style.css'
import Sidebar from './ui/sidebar'
import { Editor } from '../renderer/editor'
import { Snapshot } from '../renderer/snapshot'

export const Workbench = () => {
  return (
    <div className='w-screen h-screen'>
      <Allotment>
        <Allotment.Pane>
          <button
            onClick={() => {
              const [connectedNodes, loopConnections] = traverse()

              console.log(connectedNodes, loopConnections)
            }}
            className='absolute left-0 top-0 z-50 m-2 w-24 bg-zinc-200 rounded font-extrabold'
          >
            RUN
          </button>
          <Editor />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={200}>
          <Allotment vertical>
            <Allotment.Pane>
              <div className='bg-zinc-900 h-full overflow-auto w-full text-zinc-300 p-2 font-semibold text-xs'>
                TODO:
                <p className='line-through'>Read nodes from json</p>
                <p className='line-through'>Loops</p>
                <p>Undo/redo</p>
                <p>Delete node/edge</p>
                <p>Context menu</p>
                <p>Shortcuts</p>
                <p>Generate scenario</p>
                <p>Dynamic node outputs</p>
                <p>Custom inputs</p>
                <p>Backward compatibility</p>
              </div>
            </Allotment.Pane>
            <Allotment.Pane>
              <Snapshot />
            </Allotment.Pane>
            <Allotment.Pane>
              <Sidebar />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
