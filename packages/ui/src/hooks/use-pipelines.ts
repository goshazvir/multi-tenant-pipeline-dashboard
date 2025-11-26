import useSWR from 'swr'
import { fetchPipelines } from '../lib/api'
import type { Pipeline } from '../types/pipeline'

export function usePipelines(tenantId?: string) {
  const { data, error, isLoading, mutate } = useSWR<Pipeline[]>(
    tenantId ? `/api/pipelines?tenantId=${tenantId}` : '/api/pipelines',
    () => fetchPipelines(tenantId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  return {
    pipelines: data,
    isLoading,
    isError: error,
    mutate,
  }
}
