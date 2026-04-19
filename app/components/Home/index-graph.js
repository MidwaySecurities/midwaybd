// 'use client'
// import { useEffect, useState } from 'react'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'

// const DseDsexChart = () => {
//   const [dsexData, setDsexData] = useState([])

//   useEffect(() => {
//     const fetchDSEX = async () => {
//       try {
//         const res = await fetch('/api/dsex')
//         const data = await res.json()

//         // Format API data
//         const formattedData = data.map((d) => ({
//           timestamp: new Date(d.time).getTime(),
//           value: d.value,
//         }))

//         // Cutoff from 9:59 AM (today)
//         const now = new Date()
//         const cutoff = new Date(
//           now.getFullYear(),
//           now.getMonth(),
//           now.getDate(),
//           9,
//           59,
//           0
//         ).getTime()

//         // Filter out earlier data
//         const filteredData = formattedData.filter((d) => d.timestamp >= cutoff)

//         setDsexData(filteredData)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchDSEX()
//   }, [])

//   if (!dsexData.length) return <p>Loading DSEX data...</p>

//   const yMin = Math.min(...dsexData.map((d) => d.value)) * 0.999
//   const yMax = Math.max(...dsexData.map((d) => d.value)) * 1.001

//   // Calculate X-axis domain: start at 9:59, end at last data point
//   const firstTimestamp = new Date()
//   firstTimestamp.setHours(9, 59, 0, 0)
//   const startDomain = firstTimestamp.getTime()
//   const endDomain = Math.max(...dsexData.map((d) => d.timestamp))

//   const generateFiveMinuteTicks = (start, end) => {
//     const ticks = []
//     const interval = 5 * 60 * 1000 // 5 minutes in ms
//     let current = start

//     // Round up to the next 5-minute mark (e.g., 9:59 → 10:00)
//     const remainder = current % interval
//     if (remainder !== 0) {
//       current += interval - remainder
//     }

//     while (current <= end) {
//       ticks.push(current)
//       current += interval
//     }

//     return ticks
//   }

//   const step = 5;

//   // Find min and max from your data
//   const minValue = Math.min(...dsexData.map(d => d.value))
//   const maxValue = Math.max(...dsexData.map(d => d.value))

//   // Start Y-axis a bit below the first value
//   const yStart = Math.floor(minValue / step) * step - step  // leaves 1-step room below
//   const yEnd = Math.ceil(maxValue / step) * step            // top aligned

//   // Generate ticks array
//   const generateYAxisTicks = (start, end, step = 5) => {
//     const ticks = []
//     for (let i = start; i <= end; i += step) {
//       ticks.push(i)
//     }
//     return ticks
//   }

//   return (
//     <div className="h-64">
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           data={dsexData}
//           margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="timestamp"
//             type="number"
//             domain={[startDomain, endDomain]}
//             ticks={generateFiveMinuteTicks(startDomain, endDomain)}
//             tickFormatter={(ts) => {
//               const d = new Date(ts)
//               const h = d.getHours()
//               const m = d.getMinutes().toString().padStart(2, '0')
//               return `${h}:${m}`
//             }}
//           />
//           <YAxis
//             domain={[yStart, yEnd]}
//             ticks={generateYAxisTicks(yStart, yEnd, step)}
//             interval={0}          // ensures all ticks show
//             allowDecimals={false} // no decimal ticks
//             tickFormatter={(v) => v.toLocaleString()}
//           />


//           <Tooltip
//             labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
//             formatter={(value) => [value, 'DSEX']}
//           />
//           <defs>
//             <linearGradient id="colorDSEX" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
//               <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#3B82F6"
//             strokeWidth={2}
//             fillOpacity={1}
//             fill="url(#colorDSEX)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default DseDsexChart


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

        // Normalize timestamps → minute precision (VERY IMPORTANT)
        const formatted = data.map(d => {
          const t = new Date(d.time)
          t.setSeconds(0, 0)

          return {
            timestamp: t.getTime(),
            value: Number(d.value),
          }
        })

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

        const filtered = formatted.filter(d => d.timestamp >= marketOpen)
        setDsexData(filtered)
      } catch (err) {
        console.error(err)
      }
    }

    fetchDSEX()
  }, [])

  if (!dsexData.length) return <p>Loading DSEX data...</p>

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
          {/* Subtle grid */}
          <CartesianGrid
            strokeDasharray="2 6"
            stroke="#E5E7EB"
            vertical={false}
          />

          {/* X Axis */}
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

          {/* Y Axis */}
          <YAxis
            domain={[yStart - padding, yEnd + padding]}
            tickFormatter={(v) => v.toLocaleString()}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          {/* Tooltip */}
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

          {/* Gradient */}
          <defs>
            <linearGradient id="dsexGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area */}
          <Area
            type="linear"      // financial-style
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
