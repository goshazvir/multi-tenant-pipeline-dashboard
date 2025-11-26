import type { Pipeline } from '../types/pipeline'

/**
 * Client-side fetch function for pipelines
 * Calls Next.js API routes (same-origin, no CORS issues)
 *
 * The actual AWS API Gateway request is proxied server-side by Next.js API routes.
 * This eliminates CORS issues and keeps the AWS URL out of client code.
 */
export async function fetchPipelines(
  tenantId?: string
): Promise<Pipeline[]> {
  const url = tenantId
    ? `/api/pipelines?tenantId=${tenantId}`
    : '/api/pipelines'

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch pipelines: ${response.statusText}`)
  }

  return response.json()
}
