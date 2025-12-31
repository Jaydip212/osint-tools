'use client'

import { useState } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { Search, Loader2 } from 'lucide-react'

interface SearchBarProps {
  onQueryComplete: (queryId: number) => void
}

export default function SearchBar({ onQueryComplete }: SearchBarProps) {
  const [queryType, setQueryType] = useState('username')
  const [queryValue, setQueryValue] = useState('')
  const [loading, setLoading] = useState(false)

  const queryTypes = [
    { value: 'username', label: 'Username' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'domain', label: 'Domain' },
    { value: 'ip', label: 'IP Address' },
    { value: 'company', label: 'Company' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryValue.trim()) {
      toast.error('Please enter a search value')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/api/osint/query', {
        query_type: queryType,
        query_value: queryValue.trim(),
      })
      
      toast.success('OSINT analysis complete!')
      onQueryComplete(response.data.id)
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cyber-card p-6 rounded-lg">
      <h2 className="text-xl font-bold text-cyber-green mb-4 cyber-glow">
        New OSINT Investigation
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-cyber-cyan mb-2">Query Type</label>
          <select
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
            className="w-full px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green"
          >
            {queryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-cyber-cyan mb-2">Query Value</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              placeholder={`Enter ${queryType}...`}
              className="flex-1 px-4 py-2 bg-cyber-darker border border-cyber-green/30 rounded focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green text-cyber-green placeholder-cyber-cyan/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-cyber-green/20 border border-cyber-green rounded hover:bg-cyber-green/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-cyber-green font-bold flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 p-3 bg-cyber-darker/50 rounded text-xs text-cyber-cyan/70">
        <p className="font-bold text-cyber-yellow mb-1">⚠️ Legal Notice:</p>
        <p>This tool only collects publicly available information. No private data or unauthorized access.</p>
      </div>
    </div>
  )
}

