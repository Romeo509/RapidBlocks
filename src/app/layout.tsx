import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RapidBlocks — Visual Builder',
  description: 'Build beautiful websites with drag and drop components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f5f5f7]">{children}</body>
    </html>
  )
}
