'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, BarChart, Bar } from 'recharts'

const websiteTraffic = [
  { name: 'Mon', visitors: 1240, pageviews: 3420, bounceRate: 35 },
  { name: 'Tue', visitors: 1180, pageviews: 3200, bounceRate: 32 },
  { name: 'Wed', visitors: 1420, pageviews: 4100, bounceRate: 28 },
  { name: 'Thu', visitors: 1650, pageviews: 4650, bounceRate: 25 },
  { name: 'Fri', visitors: 1890, pageviews: 5320, bounceRate: 22 },
  { name: 'Sat', visitors: 980, pageviews: 2100, bounceRate: 45 },
  { name: 'Sun', visitors: 720, pageviews: 1650, bounceRate: 52 }
]

const IndexGraph = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={websiteTraffic}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IndexGraph;