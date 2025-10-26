'use client'
import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const DseDsexChart = () => {
  const [dsexData, setDsexData] = useState([])

  useEffect(() => {
    const fetchDSEX = async () => {
      try {
        const res = await fetch('/api/dsex')
        const data = await res.json()

        // Convert time string to timestamp and visitors to value
        const formattedData = data.map((d) => ({
          timestamp: new Date(d.time).getTime(),
          value: d.value,
        }))

        setDsexData(formattedData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDSEX()
  }, [])
  if (!dsexData.length) return <p>Loading DSEX data...</p>

  const yMin = Math.min(...dsexData.map((d) => d.value)) * 0.999
  const yMax = Math.max(...dsexData.map((d) => d.value)) * 1.001

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dsexData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(ts) => {
              const d = new Date(ts)
              return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
            }}
          />
          <YAxis domain={[Math.ceil(yMin), Math.ceil(yMax)]} />
          <Tooltip
            labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            formatter={(value) => [value, 'DSEX']}
          />
          <defs>
            <linearGradient id="colorDSEX" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorDSEX)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DseDsexChart
