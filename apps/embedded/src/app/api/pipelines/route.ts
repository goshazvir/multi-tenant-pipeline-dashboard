import { NextResponse } from 'next/server'
import { proxyAwsApiGateway, CORS_HEADERS } from '@repo/ui'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Priority: query param > DEFAULT_TENANT_ID env var
  const tenantId =
    searchParams.get('tenantId') || process.env.DEFAULT_TENANT_ID

  const result = await proxyAwsApiGateway({
    baseUrl: process.env.AWS_API_BASE_URL!,
    endpoint: '/pipelines',
    tenantId,
  })

  return NextResponse.json(
    result.success ? result.data : { error: result.error },
    {
      status: result.status,
      headers: CORS_HEADERS,
    }
  )
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS })
}
