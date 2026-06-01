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
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockReviews = [
  { 
    id: 1, 
    customer: "John Doe", 
    product: "Romantic Couple Stone", 
    rating: 5, 
    comment: "Absolutely stunning! The quality exceeded my expectations. My wife loved it.",
    date: "2024-01-15",
    verified: true,
    approved: true
  },
  { 
    id: 2, 
    customer: "Jane Smith", 
    product: "Divine Ganesh Stone", 
    rating: 4, 
    comment: "Beautiful artwork. The colors are vibrant and the stone quality is excellent.",
    date: "2024-01-18",
    verified: true,
    approved: true
  },
  { 
    id: 3, 
    customer: "Bob Johnson", 
    product: "Wedding Anniversary Gift", 
    rating: 5, 
    comment: "Perfect anniversary gift. The customization was exactly as requested.",
    date: "2024-01-20",
    verified: true,
    approved: false
  },
  { 
    id: 4, 
    customer: "Alice Brown", 
    product: "Pet Memorial Stone", 
    rating: 5, 
    comment: "A beautiful tribute to my beloved pet. Thank you for such a meaningful piece.",
    date: "2024-01-22",
    verified: true,
    approved: true
  },
  { 
    id: 5, 
    customer: "Charlie Davis", 
    product: "Family Photo Stone", 
    rating: 3, 
    comment: "Good quality but the image could be sharper. Overall satisfied.",
    date: "2024-01-25",
    verified: false,
    approved: false
  },
]

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "approved" && review.approved) ||
      (statusFilter === "pending" && !review.approved)
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter)
    return matchesSearch && matchesStatus && matchesRating
  })

  const handleApprove = (reviewId: number) => {
    // In production, call API to approve review
    console.log("Approve review:", reviewId)
  }

  const handleDelete = (reviewId: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      // In production, call API to delete review
      console.log("Delete review:", reviewId)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage customer reviews</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockReviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {(mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approval</p>
                  <p className="text-2xl font-bold text-amber-600">{mockReviews.filter(r => !r.approved).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verified Reviews</p>
                  <p className="text-2xl font-bold text-green-600">{mockReviews.filter(r => r.verified).length}</p>
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
                    placeholder="Search reviews..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.customer}</TableCell>
                      <TableCell>{review.product}</TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                      <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {review.verified && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              Verified
                            </Badge>
                          )}
                          {review.approved ? (
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              Pending
                            </Badge>
                          )}
                        </div>
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
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {!review.approved && (
                              <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(review.id)}
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
