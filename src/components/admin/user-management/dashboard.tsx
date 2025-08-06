"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  MessageSquare, 
  Newspaper, 
  BarChart,
  Plus,
  Eye,
  TrendingUp,
  Clock,
  ArrowRight,
  Users,
  Settings,
  Activity,
  Calendar,
  Target,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <BarChart className="h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-900">Total Articles</CardTitle>
            <div className="p-2 bg-blue-200 rounded-lg">
              <Newspaper className="h-4 w-4 text-blue-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 mb-2">23</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 this month
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="w-full justify-between text-blue-700 hover:text-blue-900 hover:bg-blue-50 p-2"
            >
              <Link href="/admin/articles/new">
                Add Article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-900">Total Products</CardTitle>
            <div className="p-2 bg-green-200 rounded-lg">
              <Package className="h-4 w-4 text-green-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 mb-2">12</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">
                <Plus className="h-3 w-3 mr-1" />
                +2 this month
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="w-full justify-between text-green-700 hover:text-green-900 hover:bg-green-50 p-2"
            >
              <Link href="/admin/product/new">
                Add Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-orange-900">Contact Messages</CardTitle>
            <div className="p-2 bg-orange-200 rounded-lg relative">
              <MessageSquare className="h-4 w-4 text-orange-700" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 mb-2">7</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
                <Zap className="h-3 w-3 mr-1" />
                3 Unread
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="w-full justify-between text-orange-700 hover:text-orange-900 hover:bg-orange-50 p-2"
            >
              <Link href="/admin/contact-messages">
                View Messages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-900">Mersif Numbers</CardTitle>
            <div className="p-2 bg-purple-200 rounded-lg">
              <BarChart className="h-4 w-4 text-purple-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-purple-900 mb-1">Last updated:</div>
            <div className="text-lg font-bold text-purple-900 mb-3">2 days ago</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                <Clock className="h-3 w-3 mr-1" />
                Update needed
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="w-full justify-between text-purple-700 hover:text-purple-900 hover:bg-purple-50 p-2"
            >
              <Link href="/admin/mersif-numbers">
                Update Data
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="w-full justify-start h-10 border-gray-200 hover:bg-gray-50"
            >
              <Link href="/admin/articles/new">
                <Newspaper className="h-4 w-4 mr-3" />
                New Article
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="w-full justify-start h-10 border-gray-200 hover:bg-gray-50"
            >
              <Link href="/admin/product/new">
                <Package className="h-4 w-4 mr-3" />
                Add Product
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="sm"
              asChild
              className="w-full justify-start h-10 border-gray-200 hover:bg-gray-50"
            >
              <Link href="/admin/testimonials">
                <Users className="h-4 w-4 mr-3" />
                Manage Testimonials
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New article published</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Product updated</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New contact message</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Website</span>
              <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Time</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">
                98ms
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-gray-200 hover:bg-gray-50"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
