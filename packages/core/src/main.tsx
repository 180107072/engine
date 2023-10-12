import React from 'react'
import ReactDOM from 'react-dom/client'
import { Workbench } from './workbench'
import WorkbenchProvider from './workbench/provider'

import 'reactflow/dist/base.css'
import 'allotment/dist/style.css'
import './shared/css/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorkbenchProvider>
      <Workbench />
    </WorkbenchProvider>
  </React.StrictMode>
)
