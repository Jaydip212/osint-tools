'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TimelineChartProps {
  data: any[]
}

export default function TimelineChart({ data }: TimelineChartProps) {
  // Process timeline data for chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    count: 1,
  }))

  // Group by date
  const grouped = chartData.reduce((acc: any, item) => {
    acc[item.date] = (acc[item.date] || 0) + 1
    return acc
  }, {})

  const finalData = Object.entries(grouped).map(([date, count]) => ({
    date,
    count,
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={finalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00ff0030" />
          <XAxis dataKey="date" stroke="#00ffff" />
          <YAxis stroke="#00ffff" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0e27',
              border: '1px solid #00ff00',
              color: '#00ff00',
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#00ff00"
            strokeWidth={2}
            dot={{ fill: '#00ff00', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

