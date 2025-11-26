import type { Metadata } from 'next'
import { ThemeProvider } from '@repo/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'SK8 Admin - Pipeline Dashboard',
  description: 'Multi-tenant pipeline administration dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="admin">{children}</ThemeProvider>
      </body>
    </html>
  )
}
