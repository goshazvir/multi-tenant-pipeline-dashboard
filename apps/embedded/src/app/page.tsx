import { PipelineTable } from '@repo/ui'

export default function EmbeddedPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Amazing <span className="text-primary">Vendor 1</span> App Using SK8
          </h1>
          <p className="text-muted-foreground">Powered by SK8 Pipelines</p>
        </header>

        <PipelineTable showTenantColumn={false} />
      </div>
    </main>
  )
}
