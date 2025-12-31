'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Search, Clock } from 'lucide-react'

interface QueryHistoryProps {
  onSelectQuery: (queryId: number) => void
}

export default function QueryHistory({ onSelectQuery }: QueryHistoryProps) {
  const [queries, setQueries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await api.get('/api/osint/queries')
        setQueries(response.data)
      } catch (error) {
        toast.error('Failed to load query history')
      } finally {
        setLoading(false)
      }
    }
    fetchQueries()
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'border-cyber-red text-cyber-red'
      case 'MEDIUM':
        return 'border-cyber-yellow text-cyber-yellow'
      default:
        return 'border-cyber-green text-cyber-green'
    }
  }

  if (loading) {
    return (
      <div className="cyber-card p-8 text-center">
        <div className="text-cyber-green animate-pulse">Loading history...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyber-green cyber-glow mb-6">
        Query History
      </h2>

      {queries.length === 0 ? (
        <div className="cyber-card p-8 text-center text-cyber-cyan">
          No queries yet. Start a new search to see results here.
        </div>
      ) : (
        <div className="space-y-3">
          {queries.map((query) => (
            <div
              key={query.id}
              className="cyber-card p-4 rounded-lg hover:border-cyber-green/50 transition-all cursor-pointer"
              onClick={() => onSelectQuery(query.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="w-4 h-4 text-cyber-green" />
                    <span className="font-bold text-cyber-green">{query.query_type}</span>
                    <span className="text-cyber-cyan">:</span>
                    <span className="text-cyber-green">{query.query_value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyber-cyan">
                    <Clock className="w-3 h-3" />
                    {format(new Date(query.created_at), 'PPp')}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded border ${getRiskColor(query.risk_score)}`}>
                  {query.risk_score}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

