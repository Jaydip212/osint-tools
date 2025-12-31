'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import QueryHistory from '@/components/QueryHistory'
import QueryResults from '@/components/QueryResults'
import Cases from '@/components/Cases'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, logout } from '@/lib/auth'
import { User } from '@/lib/auth'
import { LogOut, User as UserIcon } from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'search' | 'history' | 'cases'>('search')
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        logout()
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Header */}
      <header className="cyber-border border-b border-cyber-green/30 bg-cyber-darker/50 bg-cyber-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyber-green cyber-glow">
              OSINT TOOL
            </h1>
            <p className="text-xs text-cyber-cyan">Professional Intelligence Platform | Jayvik Labs</p>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 text-cyber-cyan">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">{user.username}</span>
              </div>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-cyber-red/20 border border-cyber-red/30 rounded hover:bg-cyber-red/30 transition-all text-cyber-red flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'search' && (
            <div className="space-y-6">
              <SearchBar onQueryComplete={(queryId) => setSelectedQuery(queryId)} />
              {selectedQuery && (
                <QueryResults queryId={selectedQuery} />
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <QueryHistory onSelectQuery={(queryId) => {
              setSelectedQuery(queryId)
              setActiveTab('search')
            }} />
          )}

          {activeTab === 'cases' && <Cases />}
        </main>
      </div>
    </div>
  )
}

