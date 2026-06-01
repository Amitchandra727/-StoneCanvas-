"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { products } from "@/lib/products"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    { label: "Total Revenue", value: "₹2,45,678", icon: DollarSign, color: "text-green-600 dark:text-green-400", change: "+12%", changeIcon: ArrowUpRight },
    { label: "Total Orders", value: "156", icon: ShoppingCart, color: "text-blue-600 dark:text-blue-400", change: "+8%", changeIcon: ArrowUpRight },
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-purple-600 dark:text-purple-400", change: "+3%", changeIcon: ArrowUpRight },
    { label: "Total Users", value: "1,234", icon: Users, color: "text-amber-600 dark:text-amber-400", change: "+15%", changeIcon: ArrowUpRight },
  ]

  const quickActions = [
    { title: "Add Product", description: "Create a new product", href: "/admin/products", icon: Package },
    { title: "View Orders", description: "Manage customer orders", href: "/admin/orders", icon: ShoppingCart },
    { title: "Manage Coupons", description: "Create discount codes", href: "/admin/coupons", icon: TrendingUp },
    { title: "View Analytics", description: "Track performance", href: "/admin/analytics", icon: DollarSign },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your store.</p>
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
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <div className={`flex items-center mt-2 ${stat.change === "+12%" || stat.change === "+8%" || stat.change === "+15%" ? "text-green-600" : "text-red-600"}`}>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/products">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
              </Link>
              <Link href="/admin/reviews">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Manage Reviews
                </Button>
              </Link>
              <Link href="/admin/coupons">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Manage Coupons
                </Button>
              </Link>
              <Link href="/admin/banners">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Banners
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
