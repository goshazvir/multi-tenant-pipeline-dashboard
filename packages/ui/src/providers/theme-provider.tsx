'use client'

import * as React from 'react'

export type Theme = 'admin' | 'embedded'

export interface ThemeProviderProps {
  theme: Theme
  children: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <div data-theme={theme} className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}
