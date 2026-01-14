import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RapidBlocks - No-Code Builder',
  description: 'Build beautiful websites with drag and drop components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
