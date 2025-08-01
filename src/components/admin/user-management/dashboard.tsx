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
  Activity
} from "lucide-react"

export default function DashboardPage() {
  const handleNavigate = (page: string) => {
    // Navigation logic - replace with your routing solution
    // Example: router.push(`/${page}`)
    console.log(`Navigating to: ${page}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-600">Monitor your platform performance and manage content</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('settings')}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              size="sm"
              onClick={() => handleNavigate('analytics')}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Articles</CardTitle>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Newspaper className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">23</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 this month
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigate('admin/articles/new')}
              className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            >
              Add Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Total Products</CardTitle>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">12</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <Plus className="h-3 w-3 mr-1" />
                +2 this month
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigate('products')}
              className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            >
              Manage Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Contact Messages</CardTitle>
            <div className="p-2 bg-gray-100 rounded-lg relative">
              <MessageSquare className="h-4 w-4 text-gray-600" />
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">7</div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                Unread
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigate('messages')}
              className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            >
              View Messages
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-700">Mersif Numbers</CardTitle>
            <div className="p-2 bg-gray-100 rounded-lg">
              <BarChart className="h-4 w-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-gray-900 mb-1">Last updated:</div>
            <div className="text-lg font-bold text-gray-900 mb-3">2 days ago</div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-amber-500" />
              <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                Update needed
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigate('mersif-update')}
              className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            >
              Update Data
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <Plus className="h-5 w-5 text-gray-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => handleNavigate('articles/new')}
              variant="outline"
              size="sm"
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Newspaper className="h-4 w-4 mr-2" />
              New Article
            </Button>
            <Button 
              onClick={() => handleNavigate('products/new')}
              variant="outline"
              size="sm"
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button 
              onClick={() => handleNavigate('users')}
              variant="outline"
              size="sm"
              className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <Activity className="h-5 w-5 text-gray-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900 font-medium">Article published</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900 font-medium">Product updated</p>
                  <p className="text-gray-500 text-xs">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900 font-medium">New messages received</p>
                  <p className="text-gray-500 text-xs">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <Eye className="h-5 w-5 text-gray-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Website</span>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Database</span>
              <Badge className="bg-green-50 text-green-700 border-green-200">
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Response Time</span>
              <Badge className="bg-gray-50 text-gray-700 border-gray-200">
                98ms
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNavigate('system-status')}
              className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}