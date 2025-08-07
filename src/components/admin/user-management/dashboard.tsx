"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Newspaper,
  Star,
  Hash,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Activity,
  Database,
  Globe
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  articles: {
    total: number
    published: number
    draft: number
  }
  news: {
    total: number
    published: number
    draft: number
  }
  users: number
  comments: {
    total: number
    pending: number
    approved: number
  }
  testimonials: number
  mersifNumbers: number
}

interface RecentActivity {
  articles: Array<{
    id: number
    title: string
    status: string
    createdAt: string
    author: { username: string }
  }>
  comments: Array<{
    id: number
    content: string
    status: string
    createdAt: string
    user: { username: string }
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivities, setRecentActivities] = useState<RecentActivity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setRecentActivities(data.recentActivities)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Kelola konten dan monitor aktivitas platform Anda</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-gray-300">
            <Calendar className="h-4 w-4" />
            Hari Ini
          </Button>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="h-4 w-4" />
            Lihat Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Articles */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Artikel</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stats?.articles.total || 0}</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                {stats?.articles.published || 0} Published
              </Badge>
              {(stats?.articles.draft || 0) > 0 && (
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  {stats?.articles.draft} Draft
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Link href="/admin/articles-news">
                Kelola Artikel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* News */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Berita</CardTitle>
            <div className="p-2 bg-green-50 rounded-lg">
              <Newspaper className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stats?.news.total || 0}</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                {stats?.news.published || 0} Published
              </Badge>
              {(stats?.news.draft || 0) > 0 && (
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  {stats?.news.draft} Draft
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-green-600 hover:text-green-700 hover:bg-green-50">
              <Link href="/admin/articles-news">
                Kelola Berita
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Users */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stats?.users || 0}</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                Aktif
              </Badge>
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              <Link href="/admin/user-management">
                Kelola Users
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Komentar</CardTitle>
            <div className="p-2 bg-orange-50 rounded-lg relative">
              <MessageSquare className="h-4 w-4 text-orange-600" />
              {(stats?.comments.pending || 0) > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stats?.comments.total || 0}</div>
            <div className="flex items-center gap-2 mb-4">
              {(stats?.comments.pending || 0) > 0 ? (
                <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {stats?.comments.pending} Pending
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Semua Approved
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              <Link href="/admin/comments">
                Kelola Komentar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Testimonials */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Testimoni</CardTitle>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-4">{stats?.testimonials || 0}</div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
              <Link href="/admin/testimonials">
                Kelola Testimoni
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Mersif Numbers */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Mersif Numbers</CardTitle>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Hash className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-4">{stats?.mersifNumbers || 0}</div>
            <Button variant="ghost" size="sm" asChild className="w-full justify-between text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
              <Link href="/admin/mersif-numbers">
                Update Data
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              Status Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Globe className="h-3 w-3" />
                Website
              </span>
              <Badge className="bg-green-50 text-green-700 border-green-200">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Database className="h-3 w-3" />
                Database
              </span>
              <Badge className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Articles */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              Artikel Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities?.articles.map((article) => (
                <div key={article.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    article.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                    <p className="text-xs text-gray-500">
                      oleh {article.author.username} • {formatDate(article.createdAt)}
                    </p>
                  </div>
                  <Badge variant={article.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                    {article.status}
                  </Badge>
                </div>
              ))}
              {(!recentActivities?.articles || recentActivities.articles.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">Belum ada artikel</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="p-2 bg-orange-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              Komentar Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities?.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    comment.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 line-clamp-2">{comment.content}</p>
                    <p className="text-xs text-gray-500">
                      oleh {comment.user.username} • {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'} className="text-xs">
                    {comment.status}
                  </Badge>
                </div>
              ))}
              {(!recentActivities?.comments || recentActivities.comments.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">Belum ada komentar</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Plus className="h-5 w-5 text-blue-600" />
            </div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" size="sm" asChild className="justify-start h-10 border-gray-200 hover:bg-blue-50 hover:border-blue-200">
              <Link href="/admin/articles/new">
                <FileText className="h-4 w-4 mr-3" />
                Artikel Baru
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start h-10 border-gray-200 hover:bg-green-50 hover:border-green-200">
              <Link href="/admin/news/new">
                <Newspaper className="h-4 w-4 mr-3" />
                Berita Baru
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start h-10 border-gray-200 hover:bg-purple-50 hover:border-purple-200">
              <Link href="/admin/testimonials">
                <Star className="h-4 w-4 mr-3" />
                Kelola Testimoni
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start h-10 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200">
              <Link href="/admin/mersif-numbers">
                <Hash className="h-4 w-4 mr-3" />
                Update Numbers
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
