'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { Download, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import ResultCard from './ResultCard'
import TimelineChart from './TimelineChart'
import SourceChart from './SourceChart'

interface QueryResultsProps {
  queryId: number
}

export default function QueryResults({ queryId }: QueryResultsProps) {
  const [query, setQuery] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const response = await api.get(`/api/osint/queries/${queryId}`)
        setQuery(response.data)
      } catch (error: any) {
        toast.error('Failed to load query results')
      } finally {
        setLoading(false)
      }
    }
    fetchQuery()
  }, [queryId])

  const downloadReport = async (format: 'json' | 'pdf') => {
    try {
      const response = await api.get(`/api/reports/${format}/${queryId}`, {
        responseType: 'blob',
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `osint_report_${queryId}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      
      toast.success(`Report downloaded as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to download report')
    }
  }

  if (loading) {
    return (
      <div className="cyber-card p-8 text-center">
        <div className="text-cyber-green animate-pulse">Loading results...</div>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="cyber-card p-8 text-center">
        <div className="text-cyber-red">No results found</div>
      </div>
    )
  }

  const results = query.results?.results || []
  const analysis = query.results?.analysis || {}
  const riskScore = query.risk_score || 'LOW'

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return 'text-cyber-red'
      case 'MEDIUM':
        return 'text-cyber-yellow'
      default:
        return 'text-cyber-green'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'HIGH':
        return <XCircle className="w-5 h-5" />
      case 'MEDIUM':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-cyber-green cyber-glow mb-2">
              Investigation Results
            </h2>
            <div className="flex items-center gap-4 text-sm text-cyber-cyan">
              <span>Type: <span className="text-cyber-green">{query.query_type}</span></span>
              <span>Value: <span className="text-cyber-green">{query.query_value}</span></span>
              <span>Date: <span className="text-cyber-green">{format(new Date(query.created_at), 'PPp')}</span></span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReport('json')}
              className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded hover:bg-cyber-green/30 transition-all text-cyber-green flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              JSON
            </button>
            <button
              onClick={() => downloadReport('pdf')}
              className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded hover:bg-cyber-green/30 transition-all text-cyber-green flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>

        {/* Risk Score */}
        <div className={`p-4 rounded border ${getRiskColor(riskScore)} border-current/30 bg-current/10`}>
          <div className="flex items-center gap-2">
            {getRiskIcon(riskScore)}
            <span className="font-bold">Risk Score: {riskScore}</span>
            <span className="text-xs opacity-70 ml-2">(Informational only)</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-cyber-darker/50 rounded border border-cyber-green/20">
            <div className="text-2xl font-bold text-cyber-green">{analysis.total_sources || 0}</div>
            <div className="text-xs text-cyber-cyan">Data Sources</div>
          </div>
          <div className="p-4 bg-cyber-darker/50 rounded border border-cyber-green/20">
            <div className="text-2xl font-bold text-cyber-green">{analysis.total_findings || 0}</div>
            <div className="text-xs text-cyber-cyan">Total Findings</div>
          </div>
          <div className="p-4 bg-cyber-darker/50 rounded border border-cyber-green/20">
            <div className="text-2xl font-bold text-cyber-green">{analysis.patterns?.length || 0}</div>
            <div className="text-xs text-cyber-cyan">Patterns Detected</div>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      {analysis.timeline && analysis.timeline.length > 0 && (
        <div className="cyber-card p-6 rounded-lg">
          <h3 className="text-lg font-bold text-cyber-green mb-4">Timeline</h3>
          <TimelineChart data={analysis.timeline} />
        </div>
      )}

      {results.length > 0 && (
        <div className="cyber-card p-6 rounded-lg">
          <h3 className="text-lg font-bold text-cyber-green mb-4">Data Sources</h3>
          <SourceChart results={results} />
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-cyber-green">Detailed Results</h3>
        {results.length === 0 ? (
          <div className="cyber-card p-8 text-center text-cyber-cyan">
            No results found for this query.
          </div>
        ) : (
          results.map((result: any, index: number) => (
            <ResultCard key={index} result={result} />
          ))
        )}
      </div>

      {/* Patterns */}
      {analysis.patterns && analysis.patterns.length > 0 && (
        <div className="cyber-card p-6 rounded-lg">
          <h3 className="text-lg font-bold text-cyber-green mb-4">Detected Patterns</h3>
          <div className="space-y-3">
            {analysis.patterns.map((pattern: any, index: number) => (
              <div key={index} className="p-4 bg-cyber-darker/50 rounded border border-cyber-purple/30">
                <div className="font-bold text-cyber-purple mb-2">{pattern.type}</div>
                <div className="text-sm text-cyber-cyan">{pattern.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

