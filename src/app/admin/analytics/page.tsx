"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    { 
      label: "Total Revenue", 
      value: "₹2,45,678", 
      icon: DollarSign, 
      color: "text-green-600 dark:text-green-400", 
      change: "+12%", 
      changeIcon: ArrowUpRight,
      changeColor: "text-green-600"
    },
    { 
      label: "Total Orders", 
      value: "156", 
      icon: ShoppingCart, 
      color: "text-blue-600 dark:text-blue-400", 
      change: "+8%", 
      changeIcon: ArrowUpRight,
      changeColor: "text-green-600"
    },
    { 
      label: "Total Users", 
      value: "1,234", 
      icon: Users, 
      color: "text-amber-600 dark:text-amber-400", 
      change: "+15%", 
      changeIcon: ArrowUpRight,
      changeColor: "text-green-600"
    },
    { 
      label: "Conversion Rate", 
      value: "3.2%", 
      icon: TrendingUp, 
      color: "text-purple-600 dark:text-purple-400", 
      change: "-2%", 
      changeIcon: ArrowDownRight,
      changeColor: "text-red-600"
    },
  ]

  const topProducts = [
    { name: "Romantic Couple Stone", sales: 45, revenue: 58495 },
    { name: "Divine Ganesh Stone", sales: 38, revenue: 41800 },
    { name: "Wedding Anniversary Gift", sales: 32, revenue: 38368 },
    { name: "Pet Memorial Stone", sales: 28, revenue: 33880 },
    { name: "Family Photo Stone", sales: 25, revenue: 29975 },
  ]

  const recentActivity = [
    { type: "order", message: "New order #SC12345678 - ₹1,299", time: "2 minutes ago" },
    { type: "user", message: "New user registered: john@example.com", time: "15 minutes ago" },
    { type: "review", message: "New review: 5 stars on Romantic Couple Stone", time: "1 hour ago" },
    { type: "order", message: "Order #SC87654321 marked as delivered", time: "2 hours ago" },
    { type: "coupon", message: "Coupon WELCOME10 used 5 times today", time: "3 hours ago" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <div className={`flex items-center mt-2 ${stat.changeColor}`}>
                      <stat.changeIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Revenue chart will be displayed here</p>
                  <p className="text-sm">Integration with chart library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
                  <p>Orders chart will be displayed here</p>
                  <p className="text-sm">Integration with chart library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "order" ? "bg-blue-100 text-blue-600" :
                      activity.type === "user" ? "bg-green-100 text-green-600" :
                      activity.type === "review" ? "bg-amber-100 text-amber-600" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                      {activity.type === "order" && <ShoppingCart className="h-4 w-4" />}
                      {activity.type === "user" && <Users className="h-4 w-4" />}
                      {activity.type === "review" && <TrendingUp className="h-4 w-4" />}
                      {activity.type === "coupon" && <Package className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">4.8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">2.5</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value (₹)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">95%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
