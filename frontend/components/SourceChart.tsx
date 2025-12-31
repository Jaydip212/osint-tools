'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface SourceChartProps {
  results: any[]
}

export default function SourceChart({ results }: SourceChartProps) {
  // Count results by source
  const sourceCounts = results.reduce((acc: any, result) => {
    const source = result.source || 'unknown'
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(sourceCounts).map(([name, value]) => ({
    name,
    value,
  }))

  const COLORS = ['#00ff00', '#00ffff', '#9d4edd', '#ff006e', '#ffbe0b', '#ff6b35']

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0e27',
              border: '1px solid #00ff00',
              color: '#00ff00',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

