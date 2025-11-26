'use client'

import * as React from 'react'
import { usePipelines } from '../hooks/use-pipelines'
import { Switch } from './switch'
import { Button } from './button'
import { cn } from '../lib/utils'
import type { Pipeline } from '../types/pipeline'

export interface PipelineTableProps {
  tenantId?: string
  className?: string
  showTenantColumn?: boolean
  onPipelineToggle?: (pipeline: Pipeline) => void
}

export function PipelineTable({
  tenantId,
  className,
  showTenantColumn = false,
  onPipelineToggle,
}: PipelineTableProps) {
  const { pipelines, isLoading, isError, mutate } = usePipelines(tenantId)

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              {showTenantColumn ? 'Tenant Pipelines' : 'My Pipelines'}
            </h2>
            <p className="text-sm text-muted-foreground">
              <span className="inline-block align-middle animate-pulse bg-muted h-4 w-2 rounded" /> active / <span className="inline-block align-middle animate-pulse bg-muted h-4 w-2 rounded" /> total
            </p>
          </div>
          <Button disabled>
            <span className="mr-2">+</span>
            Add pipeline
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  {showTenantColumn && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[160px]">
                      Tenant ID
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">
                    Pipeline ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pipeline Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    {showTenantColumn && (
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium">
                          <span className="inline-block animate-pulse bg-muted rounded" style={{ width: '90px', height: '1.25rem' }} />
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-block animate-pulse bg-muted rounded text-sm" style={{ width: '60px', height: '1.25rem' }} />
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block animate-pulse bg-muted rounded text-sm" style={{ width: '140px', height: '1.25rem' }} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-block animate-pulse bg-muted rounded-full" style={{ width: '40px', height: '24px' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    // Log error details for debugging (console only, not shown to user)
    console.error('Pipeline fetch error:', isError)

    return (
      <div className={cn('rounded-lg border border-destructive p-8', className)}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-sm text-destructive text-center">
            Failed to load pipelines. Please check your connection and try again.
          </div>
          <Button variant="outline" onClick={() => mutate()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!pipelines || pipelines.length === 0) {
    return (
      <div className={cn('rounded-lg border p-8', className)}>
        <div className="flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            No pipelines found.
          </div>
        </div>
      </div>
    )
  }

  const activePipelines = pipelines.filter((p) => p.isActive).length
  const totalPipelines = pipelines.length

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            {showTenantColumn ? 'Tenant Pipelines' : 'My Pipelines'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activePipelines} active / {totalPipelines} total
          </p>
        </div>
        <Button>
          <span className="mr-2">+</span>
          Add pipeline
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-muted/50">
              <tr className="border-b">
                {showTenantColumn && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[160px]">
                    Tenant ID
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[120px]">
                  Pipeline ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pipeline Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[100px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {pipelines.map((pipeline) => (
                <tr
                  key={`${pipeline.tenantId}-${pipeline.pipelineId}`}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {showTenantColumn && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={cn("inline-flex items-center justify-center w-2 h-2 mr-2 rounded-full", pipeline.isActive ? "bg-primary" : "bg-muted")} />
                        <span className="text-sm font-medium">
                          {pipeline.tenantId}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-muted-foreground">
                      {pipeline.pipelineId}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium">
                      {pipeline.pipelineName}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Switch
                      checked={pipeline.isActive}
                      onCheckedChange={() => onPipelineToggle?.(pipeline)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
