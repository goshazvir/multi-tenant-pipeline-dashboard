/**
 * AWS API Gateway proxy utility for Next.js API routes
 *
 * This utility provides a shared function to proxy requests to AWS API Gateway
 * from Next.js API routes, solving CORS issues by making requests server-side.
 *
 * Used by both admin and embedded apps to eliminate code duplication.
 */

export interface ProxyAwsApiGatewayOptions {
  /**
   * AWS API Gateway base URL from environment variables
   * Example: https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1
   */
  baseUrl: string

  /**
   * API endpoint path (e.g., '/pipelines')
   */
  endpoint: string

  /**
   * Optional tenant ID for filtering
   * - undefined: fetch all tenants
   * - string: fetch single tenant
   */
  tenantId?: string
}

export interface ProxyResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  status: number
}

/**
 * Proxy a request to AWS API Gateway
 *
 * @param options - Proxy configuration
 * @returns Standardized response object
 *
 * @example
 * // Admin app: fetch all tenants
 * const result = await proxyAwsApiGateway({
 *   baseUrl: process.env.AWS_API_BASE_URL!,
 *   endpoint: '/pipelines'
 * })
 *
 * @example
 * // Embedded app: fetch single tenant
 * const result = await proxyAwsApiGateway({
 *   baseUrl: process.env.AWS_API_BASE_URL!,
 *   endpoint: '/pipelines',
 *   tenantId: 'xxx-ten-1'
 * })
 */
export async function proxyAwsApiGateway<T = unknown>(
  options: ProxyAwsApiGatewayOptions
): Promise<ProxyResponse<T>> {
  const { baseUrl, endpoint, tenantId } = options

  try {
    // Construct full API URL
    let apiUrl = `${baseUrl}${endpoint}`

    // Add tenantId query parameter if provided
    if (tenantId) {
      apiUrl += `?tenantId=${encodeURIComponent(tenantId)}`
    }

    // Make server-side request to AWS API Gateway
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    })

    // Handle non-OK responses
    if (!response.ok) {
      console.error(
        `AWS API Gateway error: ${response.status} ${response.statusText}`,
        { url: apiUrl }
      )

      return {
        success: false,
        error: 'Failed to fetch data from API',
        status: response.status,
      }
    }

    // Parse and return successful response
    const data = await response.json()

    return {
      success: true,
      data: data as T,
      status: response.status,
    }
  } catch (error) {
    console.error('AWS API Gateway proxy error:', error, {
      baseUrl,
      endpoint,
      tenantId,
    })

    return {
      success: false,
      error: 'Internal server error',
      status: 500,
    }
  }
}

/**
 * Standard CORS headers for API routes
 * Allows requests from any origin for development/debugging
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
}
