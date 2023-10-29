import type { TemporalState } from 'zundo'
import { useNodesApi } from '../../shared/store/create'
import { ReactFlowState } from '../../shared/store/types'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export const useTemporalStore = <T>(
  selector: (state: TemporalState<ReactFlowState>) => T,
  equality?: (a: T, b: T) => boolean
) => {
  return useStoreWithEqualityFn(useNodesApi.temporal, selector, equality)
}
