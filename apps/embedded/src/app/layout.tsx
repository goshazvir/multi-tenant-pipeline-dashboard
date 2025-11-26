import type { Metadata } from 'next'
import { ThemeProvider } from '@repo/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vendor 1 - Powered by SK8',
  description: 'Single-tenant pipeline dashboard powered by SK8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme="embedded">{children}</ThemeProvider>
      </body>
    </html>
  )
}
