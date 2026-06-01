"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  Eye,
  Download,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const orderStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]

const mockOrders = [
  { 
    id: "SC12345678", 
    customer: "John Doe", 
    email: "john@example.com", 
    amount: 1299, 
    status: "DELIVERED", 
    date: "2024-01-15", 
    items: 2,
    paymentMethod: "Razorpay",
    paymentStatus: "PAID"
  },
  { 
    id: "SC87654321", 
    customer: "Jane Smith", 
    email: "jane@example.com", 
    amount: 899, 
    status: "PROCESSING", 
    date: "2024-01-20", 
    items: 1,
    paymentMethod: "Razorpay",
    paymentStatus: "PAID"
  },
  { 
    id: "SC56781234", 
    customer: "Bob Johnson", 
    email: "bob@example.com", 
    amount: 1599, 
    status: "SHIPPED", 
    date: "2024-01-25", 
    items: 3,
    paymentMethod: "Razorpay",
    paymentStatus: "PAID"
  },
  { 
    id: "SC34567890", 
    customer: "Alice Brown", 
    email: "alice@example.com", 
    amount: 699, 
    status: "PENDING", 
    date: "2024-01-26", 
    items: 1,
    paymentMethod: "Razorpay",
    paymentStatus: "PAID"
  },
  { 
    id: "SC90123456", 
    customer: "Charlie Davis", 
    email: "charlie@example.com", 
    amount: 2199, 
    status: "CANCELLED", 
    date: "2024-01-27", 
    items: 4,
    paymentMethod: "Razorpay",
    paymentStatus: "FAILED"
  },
]

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" as "asc" | "desc" })

  const filteredOrders = mockOrders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In production, call API to update order status
    console.log("Update order status:", orderId, newStatus)
  }

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
      case "SHIPPED":
        return <Truck className="h-4 w-4" />
      case "PROCESSING":
        return <Package className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{mockOrders.filter(o => o.status === "PENDING").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
                  <p className="text-2xl font-bold text-blue-600">{mockOrders.filter(o => o.status === "PROCESSING").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shipped</p>
                  <p className="text-2xl font-bold text-purple-600">{mockOrders.filter(o => o.status === "SHIPPED").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{mockOrders.filter(o => o.status === "DELIVERED").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">₹{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant={order.paymentStatus === "PAID" ? "default" : "destructive"}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PROCESSING")}>
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "SHIPPED")}>
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "DELIVERED")}>
                                Mark as Delivered
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "CANCELLED")}>
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
