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
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDSEX = async () => {
      try {
        const res = await fetch('/api/dsex')

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}))
          throw new Error(errBody.error || `Request failed with status ${res.status}`)
        }

        const data = await res.json()
        console.log("Raw DSEX data fetched:", data)
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format from /api/dsex')
        }

        // Normalize timestamps → minute precision (VERY IMPORTANT)
        const formatted = data
          .map(d => {
            const t = new Date(d.time)
            if (isNaN(t.getTime())) return null
            t.setSeconds(0, 0)
            return {
              timestamp: t.getTime(),
              value: Number(d.value),
            }
          })
          .filter(d => d && !isNaN(d.value))

        // Market opens at 10:00 AM
        const now = new Date()
        const marketOpen = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          10,
          0,
          0
        ).getTime()

        const filtered = formatted

        if (filtered.length === 0) {
          throw new Error('No DSEX data available for today yet')
        }

        setDsexData(filtered)
        setError(null)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDSEX()
  }, [])

  if (loading) return <p>Loading DSEX data...</p>
  if (error) return <p className="text-red-500">Failed to load DSEX data: {error}</p>
  if (!dsexData.length) return <p>No DSEX data available.</p>

  /* ---------------- AXIS CALCULATIONS ---------------- */

  const timestamps = dsexData.map(d => d.timestamp)
  const values = dsexData.map(d => d.value)

  const startDomain = Math.min(...timestamps)
  const endDomain = Math.max(...timestamps)

  // Y axis padding
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const padding = (maxValue - minValue) * 0.05

  const yStart = Math.floor(minValue / 5) * 5
  const yEnd = Math.ceil(maxValue / 5) * 5

  // Generate ticks
  const generateTicks = (start, end, intervalMin) => {
    const ticks = []
    let t = start
    const step = intervalMin * 60 * 1000

    while (t <= end) {
      ticks.push(t)
      t += step
    }
    return ticks
  }

  const xTicks = generateTicks(startDomain, endDomain, 30) // 30-min labels

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dsexData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="2 6"
            stroke="#E5E7EB"
            vertical={false}
          />

          <XAxis
            dataKey="timestamp"
            type="number"
            domain={[startDomain, endDomain]}
            ticks={xTicks}
            tickFormatter={(ts) =>
              new Date(ts).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[yStart - padding, yEnd + padding]}
            tickFormatter={(v) => v.toLocaleString()}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: 'none',
              borderRadius: 6,
              fontSize: 12,
              color: '#fff',
            }}
            labelFormatter={(ts) =>
              new Date(ts).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            }
            formatter={(value) => [
              value.toLocaleString(),
              'DSEX',
            ]}
          />

          <defs>
            <linearGradient id="dsexGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="linear"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#dsexGradient)"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DseDsexChart