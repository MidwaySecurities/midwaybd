'use client'
import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/navigation'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Eye,
  MessageSquare,
  DollarSign,
  Activity,
  Bell,
  Settings,
  User,
  Calendar,
  BarChart3,
  PieChart,
  Globe,
  UserCheck,
  CreditCard,
  NewspaperIcon,
  BookOpen,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Download,
  Edit,
  Search
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, BarChart, Bar } from 'recharts'

const BrokerageDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7D')
  const [currentTime, setCurrentTime] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [blogs, setBlogs] = useState([])
  const [blogsInfo, setBlogsInfo] = useState({ total: 0, page: 1, pages: 1 })
  // Website Analytics Data
  const websiteTraffic = [
    { name: 'Mon', visitors: 1240, pageviews: 3420, bounceRate: 35 },
    { name: 'Tue', visitors: 1180, pageviews: 3200, bounceRate: 32 },
    { name: 'Wed', visitors: 1420, pageviews: 4100, bounceRate: 28 },
    { name: 'Thu', visitors: 1650, pageviews: 4650, bounceRate: 25 },
    { name: 'Fri', visitors: 1890, pageviews: 5320, bounceRate: 22 },
    { name: 'Sat', visitors: 980, pageviews: 2100, bounceRate: 45 },
    { name: 'Sun', visitors: 720, pageviews: 1650, bounceRate: 52 }
  ]

  const userGrowth = [
    { month: 'Jan', totalUsers: 1200, activeUsers: 980, newRegistrations: 120 },
    { month: 'Feb', totalUsers: 1350, activeUsers: 1100, newRegistrations: 150 },
    { month: 'Mar', totalUsers: 1520, activeUsers: 1280, newRegistrations: 170 },
    { month: 'Apr', totalUsers: 1680, activeUsers: 1420, newRegistrations: 160 },
    { month: 'May', totalUsers: 1850, activeUsers: 1580, newRegistrations: 170 },
    { month: 'Jun', totalUsers: 2100, activeUsers: 1820, newRegistrations: 250 }
  ]

  const contentPerformance = [
    { name: 'Blog Posts', published: blogsInfo.total, views: 45200, engagement: 4.2 },
    { name: 'Research Reports', published: 12, views: 18600, engagement: 6.8 },
    { name: 'News Articles', published: 156, views: 92400, engagement: 3.1 },
    { name: 'Video Content', published: 8, views: 12800, engagement: 5.9 }
  ]

  // const recentBlogs = [
  //   { title: 'Market Outlook 2024: Key Sectors to Watch', author: 'John Smith', status: 'published', views: 2340, date: '2024-12-20' },
  //   { title: 'IPO Analysis: Upcoming Opportunities', author: 'Sarah Johnson', status: 'draft', views: 0, date: '2024-12-19' },
  //   { title: 'Dividend Investing Strategies', author: 'Mike Chen', status: 'published', views: 1890, date: '2024-12-18' },
  //   { title: 'Technical Analysis Guide', author: 'Lisa Wang', status: 'review', views: 0, date: '2024-12-17' }
  // ]
  const recentBlogs = blogs.map(blog => ({
    title: blog.title,
    type: blog.category || 'General',
    author: blog.author || 'Admin',
    status: blog.status || 'published',
    views: blog.views || 0,
    date: new Date(blog.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }))

  const researchReports = [
    { title: 'Banking Sector Analysis Q4 2024', type: 'Sector Report', downloads: 456, rating: 4.8, date: '2024-12-20' },
    { title: 'SQURPHARMA Company Deep Dive', type: 'Company Report', downloads: 234, rating: 4.6, date: '2024-12-19' },
    { title: 'Market Weekly: December 3rd Week', type: 'Weekly Report', downloads: 789, rating: 4.5, date: '2024-12-18' },
    { title: 'IPO Calendar & Analysis', type: 'IPO Report', downloads: 567, rating: 4.7, date: '2024-12-17' }
  ]

  const userSegments = [
    { name: 'Active Traders', count: 580, color: '#3B82F6', growth: 12.5 },
    { name: 'Long-term Investors', count: 720, color: '#10B981', growth: 8.3 },
    { name: 'New Users', count: 320, color: '#F59E0B', growth: 22.1 },
    { name: 'Premium Members', count: 180, color: '#8B5CF6', growth: 15.7 },
    { name: 'Inactive Users', count: 300, color: '#EF4444', growth: -5.2 }
  ]

  const recentActivities = [
    { type: 'user_registration', message: 'New user registered: Ahmed Rahman', time: '5 min ago', icon: UserCheck },
    { type: 'blog_published', message: 'Blog post "Market Outlook 2024" published', time: '1 hour ago', icon: FileText },
    { type: 'research_download', message: 'Research report downloaded 50+ times', time: '2 hours ago', icon: Download },
    { type: 'system_update', message: 'Website maintenance completed', time: '4 hours ago', icon: Settings },
    { type: 'user_feedback', message: 'New feedback received (5-star rating)', time: '6 hours ago', icon: MessageSquare }
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchBlogs(){
      const res = await fetch('/api/blogs')
      const data = await res.json()
      setBlogs(data.blogs || [])
      setBlogsInfo(data.pagination || { total: 0, page: 1, pages: 1 })
    }
    fetchBlogs()
  }, [])
  console.log(blogs, blogsInfo)
  const StatCard = ({ title, value, change, icon: Icon, color = "blue", subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
            change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brokerage Dashboard</h1>
            <p className="text-gray-600">Manage your brokerage house website and operations</p>
            <p className="text-sm text-gray-500 mt-1">{currentTime}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Content
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'research', label: 'Research', icon: TrendingUp },
            { id: 'analytics', label: 'Analytics', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Website Users"
              value="2,100"
              change={12.5}
              icon={Users}
              color="blue"
              subtitle="Active this month"
            />
            <StatCard
              title="Published Content"
              value="200"
              change={8.3}
              icon={FileText}
              color="green"
              subtitle="Blogs, News, Research"
            />
            <StatCard
              title="Research Downloads"
              value="1,246"
              change={22.1}
              icon={Download}
              color="purple"
              subtitle="This month"
            />
            <StatCard
              title="Client Inquiries"
              value="89"
              change={-5.2}
              icon={MessageSquare}
              color="orange"
              subtitle="Pending responses: 12"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Website Traffic */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Website Traffic</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                >
                  <option value="7D">Last 7 Days</option>
                  <option value="30D">Last 30 Days</option>
                  <option value="90D">Last 90 Days</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={websiteTraffic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
            </div>

            {/* User Segments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">User Segments</h3>
              <div className="space-y-4">
                {userSegments.map((segment) => (
                  <div key={segment.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{segment.name}</p>
                        <p className="text-sm text-gray-500">{segment.count} users</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      segment.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <activity.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <>
          {/* Content Performance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {contentPerformance.map((content) => (
              <div key={content.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{content.name}</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">{content.published}</p>
                <p className="text-sm text-gray-600 mb-2">{content.views.toLocaleString()} views</p>
                <p className="text-sm text-gray-500">Engagement: {content.engagement}/10</p>
              </div>
            ))}
          </div>

          {/* Blog Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Blog Posts</h3>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button onClick={() => {
                  router.push('/blogs/create')
                }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Blog
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Title</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Author</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Views</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBlogs.map((blog, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-900">{blog.title}</td>
                      <td className="py-3 text-gray-600">{blog.author}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === 'published' ? 'bg-green-100 text-green-700' :
                          blog.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {blog.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 text-gray-900">{blog.views.toLocaleString()}</td>
                      <td className="py-3 text-gray-600">{blog.date}</td>
                      <td className="py-3">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Research Tab */}
      {activeTab === 'research' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Research Reports</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Report
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchReports.map((report, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.type}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{report.rating}★</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{report.downloads} downloads</span>
                  <span>{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">User Growth</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Export Users
              </button>
            </div>
          </div>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="totalUsers" fill="#3B82F6" name="Total Users" />
                <Bar dataKey="newRegistrations" fill="#10B981" name="New Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrokerageDashboard