import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'OSINT Tool - Professional Intelligence Platform | Jayvik Labs',
  description: 'Educational Open Source Intelligence Tool - Legal Use Only | Developed by Jayvik Labs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0e27',
              color: '#00ff00',
              border: '1px solid rgba(0, 255, 0, 0.3)',
            },
          }}
        />
      </body>
    </html>
  )
}

