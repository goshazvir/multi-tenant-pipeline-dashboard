import { PipelineTable } from '@repo/ui'

export default function AdminPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SK8 Admin</h1>
          <p className="text-muted-foreground">Multi-tenant Pipeline Dashboard</p>
        </header>

        <PipelineTable showTenantColumn={true} />
      </div>
    </main>
  )
}
