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
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  MoreVertical,
  Calendar,
  Percent,
  DollarSign
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockCoupons = [
  { 
    id: 1, 
    code: "WELCOME10", 
    description: "First order discount for new customers",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minPurchase: 500,
    maxDiscount: 100,
    usageLimit: 100,
    usedCount: 45,
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    active: true
  },
  { 
    id: 2, 
    code: "STONE20", 
    description: "Special discount on all stone art products",
    discountType: "PERCENTAGE",
    discountValue: 20,
    minPurchase: 1000,
    maxDiscount: 500,
    usageLimit: 50,
    usedCount: 32,
    validFrom: "2024-01-15",
    validUntil: "2024-06-30",
    active: true
  },
  { 
    id: 3, 
    code: "FLAT100", 
    description: "Flat discount on orders above ₹2000",
    discountType: "FIXED",
    discountValue: 100,
    minPurchase: 2000,
    maxDiscount: null,
    usageLimit: 200,
    usedCount: 78,
    validFrom: "2024-01-01",
    validUntil: "2024-03-31",
    active: false
  },
  { 
    id: 4, 
    code: "DIWALI25", 
    description: "Diwali special offer",
    discountType: "PERCENTAGE",
    discountValue: 25,
    minPurchase: 1500,
    maxDiscount: 750,
    usageLimit: 100,
    usedCount: 95,
    validFrom: "2024-10-15",
    validUntil: "2024-11-15",
    active: false
  },
]

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && coupon.active) ||
      (statusFilter === "inactive" && !coupon.active)
    return matchesSearch && matchesStatus
  })

  const handleDelete = (couponId: number) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      // In production, call API to delete coupon
      console.log("Delete coupon:", couponId)
    }
  }

  const handleToggleStatus = (couponId: number) => {
    // In production, call API to toggle coupon status
    console.log("Toggle coupon status:", couponId)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Coupons</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage discount coupons</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Coupons</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockCoupons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-600">{mockCoupons.filter(c => c.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Used</p>
                  <p className="text-2xl font-bold text-blue-600">{mockCoupons.reduce((acc, c) => acc + c.usedCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Usage</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {Math.round(mockCoupons.reduce((acc, c) => acc + (c.usedCount / c.usageLimit), 0) / mockCoupons.length * 100)}%
                  </p>
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
                    placeholder="Search coupons..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coupons Table */}
        <Card>
          <CardHeader>
            <CardTitle>Coupons ({filteredCoupons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Min Purchase</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Valid Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-mono font-bold text-amber-600">{coupon.code}</TableCell>
                      <TableCell className="max-w-xs truncate">{coupon.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {coupon.discountType === "PERCENTAGE" ? (
                            <Percent className="h-4 w-4 text-amber-600" />
                          ) : (
                            <DollarSign className="h-4 w-4 text-green-600" />
                          )}
                          <span className="font-medium">
                            {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>₹{coupon.minPurchase}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{coupon.usedCount} / {coupon.usageLimit}</div>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-amber-600 h-2 rounded-full" 
                              style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(coupon.validFrom).toLocaleDateString()}</div>
                          <div className="text-gray-500">to {new Date(coupon.validUntil).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={coupon.active ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"}>
                          {coupon.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(coupon.id)}>
                              {coupon.active ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(coupon.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
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
