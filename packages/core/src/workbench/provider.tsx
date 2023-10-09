import { type FC, type PropsWithChildren } from 'react'
import { useModulesApi } from './api/modulesApi'
import { Provider } from './context'

const WorkbenchProvider: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <Provider value={useModulesApi()}>{children}</Provider>
)

WorkbenchProvider.displayName = 'WorkbenchProvider'

export default WorkbenchProvider
