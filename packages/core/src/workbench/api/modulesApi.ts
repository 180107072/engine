import useSWR from 'swr'
import { loadModules } from './services/load-modules'

export const useModulesApi = () =>
  useSWR<Record<string, Module>>('/', loadModules)
