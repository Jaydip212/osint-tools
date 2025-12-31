'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import Dashboard from '@/components/Dashboard'
import { checkAuth } from '@/lib/auth'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const auth = await checkAuth()
      setIsAuthenticated(auth)
    }
    check()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-cyber-green animate-pulse">Loading...</div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />
}

