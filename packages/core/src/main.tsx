import React from 'react'
import ReactDOM from 'react-dom/client'
import { Workbench } from './workbench'
import WorkbenchProvider from './workbench/provider'

import 'reactflow/dist/base.css'
import 'allotment/dist/style.css'
import './shared/css/global.css'
import { ReactFlowProvider } from 'reactflow'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <WorkbenchProvider>
        <Workbench />
      </WorkbenchProvider>
    </ReactFlowProvider>
  </React.StrictMode>
)
