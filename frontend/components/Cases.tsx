'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { FolderPlus, FolderOpen, Trash2 } from 'lucide-react'

export default function Cases() {
  const [cases, setCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newCase, setNewCase] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      const response = await api.get('/api/cases/')
      setCases(response.data)
    } catch (error) {
      toast.error('Failed to load cases')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/api/cases/', newCase)
      toast.success('Case created successfully')
      setShowCreate(false)
      setNewCase({ name: '', description: '' })
      fetchCases()
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create case')
    }
  }

  const handleDelete = async (caseId: number) => {
    if (!confirm('Are you sure you want to delete this case?')) return
    
    try {
      await api.delete(`/api/cases/${caseId}`)
      toast.success('Case deleted')
      fetchCases()
    } catch (error) {
      toast.error('Failed to delete case')
    }
  }

  if (loading) {
    return (
      <div className="cyber-card p-8 text-center">
        <div className="text-cyber-green animate-pulse">Loading cases...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyber-green cyber-glow">
          Investigation Cases
        </h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded hover:bg-cyber-green/30 transition-all text-cyber-green flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          New Case
        </button>
      </div>

      {showCreate && (
        <div className="cyber-card p-6 rounded-lg">
          <h3 className="text-lg font-bold text-cyber-green mb-4">Create New Case</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-cyber-cyan mb-2">Case Name</label>
              <input
                type="text"
                required
                value={newCase.name}
                onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
              />
            </div>
            <div>
              <label className="block text-sm text-cyber-cyan mb-2">Description</label>
              <textarea
                value={newCase.description}
                onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-cyber-green/20 border border-cyber-green rounded hover:bg-cyber-green/30 transition-all text-cyber-green font-bold"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreate(false)
                  setNewCase({ name: '', description: '' })
                }}
                className="px-4 py-2 bg-cyber-red/20 border border-cyber-red/30 rounded hover:bg-cyber-red/30 transition-all text-cyber-red"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {cases.length === 0 ? (
        <div className="cyber-card p-8 text-center text-cyber-cyan">
          No cases yet. Create a new case to organize your investigations.
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="cyber-card p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderOpen className="w-4 h-4 text-cyber-green" />
                    <span className="font-bold text-cyber-green">{caseItem.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      caseItem.status === 'active' 
                        ? 'bg-cyber-green/20 text-cyber-green' 
                        : 'bg-cyber-cyan/20 text-cyber-cyan'
                    }`}>
                      {caseItem.status}
                    </span>
                  </div>
                  {caseItem.description && (
                    <p className="text-sm text-cyber-cyan mb-2">{caseItem.description}</p>
                  )}
                  <div className="text-xs text-cyber-cyan/70">
                    Created: {format(new Date(caseItem.created_at), 'PPp')}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(caseItem.id)}
                  className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

