"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from "lucide-react"
import { products } from "@/lib/products"
import { useThemeStore } from "@/stores/theme-store"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isDarkMode } = useThemeStore()

  // Mock data enhanced
  const stats = [
    { label: "Total Revenue", value: "₹2,45,678", icon: DollarSign, color: "text-green-600 dark:text-green-400", change: "+12%", changeIcon: ArrowUpRight },
    { label: "Total Orders", value: "156", icon: ShoppingCart, color: "text-blue-600 dark:text-blue-400", change: "+8%", changeIcon: ArrowUpRight },
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-purple-600 dark:text-purple-400", change: "+3%", changeIcon: ArrowUpRight },
    { label: "Total Users", value: "1,234", icon: Users, color: "text-amber-600 dark:text-amber-400", change: "+15%", changeIcon: ArrowUpRight },
  ]

  const recentOrders = [
    { id: "SC12345678", customer: "John Doe", email: "john@example.com", amount: 1299, status: "DELIVERED", date: "2024-01-15", items: 2 },
    { id: "SC87654321", customer: "Jane Smith", email: "jane@example.com", amount: 899, status: "PROCESSING", date: "2024-01-20", items: 1 },
    { id: "SC56781234", customer: "Bob Johnson", email: "bob@example.com", amount: 1599, status: "SHIPPED", date: "2024-01-25", items: 3 },
    { id: "SC34567890", customer: "Alice Brown", email: "alice@example.com", amount: 699, status: "PENDING", date: "2024-01-26", items: 1 },
    { id: "SC90123456", customer: "Charlie Davis", email: "charlie@example.com", amount: 2199, status: "CANCELLED", date: "2024-01-27", items: 4 },
  ]

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 5, spent: 6495, joined: "2024-01-01", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, spent: 2697, joined: "2024-01-05", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 8, spent: 10392, joined: "2024-01-10", status: "active" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", orders: 2, spent: 1398, joined: "2024-01-15", status: "active" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
      case "PROCESSING":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
      case "SHIPPED":
        return "text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
      case "PENDING":
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
      case "CANCELLED":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="h-4 w-4" />
      case "CANCELLED":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your store, orders, and products</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "products" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("products")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Products
                  </Button>
                  <Button
                    variant={activeTab === "users" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("users")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                  <Button
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center">
                              <stat.changeIcon className="h-3 w-3 mr-1" />
                              {stat.change}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders */}
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">#{order.id}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{order.date} • {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">₹{order.amount}</p>
                            <Button variant="ghost" size="sm" className="mt-1">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="dark:bg-gray-800">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">All Orders</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">#{order.id}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">{order.date} • {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">₹{order.amount}</p>
                            <Button variant="ghost" size="sm" className="mt-1">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products">
                <Card className="dark:bg-gray-800">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">Products</CardTitle>
                    <Button variant="luxury">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">{product.name}</span>
                              {product.bestseller && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                  Bestseller
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.category} • ₹{product.price}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <Card className="dark:bg-gray-800">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">Users</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                {user.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email} • {user.orders} orders • ₹{user.spent} spent</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-gray-500">Joined {user.joined}</p>
                            <Button variant="ghost" size="sm" className="mt-1">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Revenue Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400">Revenue chart coming soon</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white flex items-center">
                        <PieChart className="mr-2 h-5 w-5" />
                        Sales by Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-center">
                          <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400">Category chart coming soon</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Store Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-900 dark:text-white">Store Name</Label>
                      <Input
                        type="text"
                        defaultValue="StoneCanvas"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-white">Store Email</Label>
                      <Input
                        type="email"
                        defaultValue="hello@stonecanvas.com"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-white">Currency</Label>
                      <Select defaultValue="INR">
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-900 dark:text-white">Contact Phone</Label>
                      <Input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <Button variant="luxury">Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
