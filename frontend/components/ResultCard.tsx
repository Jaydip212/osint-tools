'use client'

import { ExternalLink, Shield } from 'lucide-react'

interface ResultCardProps {
  result: any
}

export default function ResultCard({ result }: ResultCardProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'HIGH':
        return 'border-cyber-green text-cyber-green'
      case 'MEDIUM':
        return 'border-cyber-yellow text-cyber-yellow'
      default:
        return 'border-cyber-cyan text-cyber-cyan'
    }
  }

  return (
    <div className="cyber-card p-4 rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyber-green" />
          <span className="font-bold text-cyber-green">{result.source}</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs border ${getConfidenceColor(result.confidence)}`}>
          {result.confidence}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        {Object.entries(result.data || {}).map(([key, value]: [string, any]) => (
          <div key={key} className="flex gap-2">
            <span className="text-cyber-cyan font-mono">{key}:</span>
            <span className="text-cyber-green">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>

      {result.url && (
        <div className="mt-3 pt-3 border-t border-cyber-green/20">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:text-cyber-green flex items-center gap-1 text-xs"
          >
            <ExternalLink className="w-3 h-3" />
            View Source
          </a>
        </div>
      )}

      {result.timestamp && (
        <div className="mt-2 text-xs text-cyber-cyan/70">
          {new Date(result.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  )
}

