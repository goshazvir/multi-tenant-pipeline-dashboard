export interface Pipeline {
  tenantId: string
  pipelineId: string
  pipelineName: string
  isActive: boolean
  name: string
}

export interface PipelinesResponse extends Array<Pipeline> {}
