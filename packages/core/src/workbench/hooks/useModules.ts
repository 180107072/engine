import { useContext } from 'react'
import WorkbenchContext from '../context'

export const useModules = () => {
  const context = useContext(WorkbenchContext)

  if (!context) throw Error('no ctx')

  return context
}
