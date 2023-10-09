import { createContext } from 'react'
import { useModulesApi } from './api/modulesApi'

const WorkbenchContext = createContext<ReturnType<typeof useModulesApi> | null>(
  null
)

export const Provider = WorkbenchContext.Provider
export default WorkbenchContext
