import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/css/global.css'
import { Workbench } from './workbench'
import WorkbenchProvider from './workbench/provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorkbenchProvider>
      <Workbench />
    </WorkbenchProvider>
  </React.StrictMode>
)
