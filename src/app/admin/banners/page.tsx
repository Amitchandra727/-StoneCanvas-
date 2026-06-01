"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  Eye,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockBanners = [
  { 
    id: 1, 
    title: "Valentine's Day Special", 
    subtitle: "20% off on all couple stones",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    link: "/collection?category=Couple%20Stones",
    active: true,
    order: 1
  },
  { 
    id: 2, 
    title: "New Collection Launch", 
    subtitle: "Discover our latest stone art designs",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    link: "/collection",
    active: true,
    order: 2
  },
  { 
    id: 3, 
    title: "Wedding Season Offer", 
    subtitle: "Perfect gifts for the happy couple",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    link: "/collection?category=Wedding%20Gifts",
    active: true,
    order: 3
  },
  { 
    id: 4, 
    title: "Custom Orders", 
    subtitle: "Create your personalized stone art",
    image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800",
    link: "/customize",
    active: false,
    order: 4
  },
]

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(mockBanners)

  const handleDelete = (bannerId: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter(b => b.id !== bannerId))
    }
  }

  const handleToggleStatus = (bannerId: number) => {
    setBanners(banners.map(b => 
      b.id === bannerId ? { ...b, active: !b.active } : b
    ))
  }

  const handleMoveUp = (bannerId: number) => {
    const index = banners.findIndex(b => b.id === bannerId)
    if (index > 0) {
      const newBanners = [...banners]
      const temp = newBanners[index]
      newBanners[index] = newBanners[index - 1]
      newBanners[index - 1] = temp
      setBanners(newBanners)
    }
  }

  const handleMoveDown = (bannerId: number) => {
    const index = banners.findIndex(b => b.id === bannerId)
    if (index < banners.length - 1) {
      const newBanners = [...banners]
      const temp = newBanners[index]
      newBanners[index] = newBanners[index + 1]
      newBanners[index + 1] = temp
      setBanners(newBanners)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Banners</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage homepage banners</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Banners</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{banners.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-600">{banners.filter(b => b.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
                  <p className="text-2xl font-bold text-gray-600">{banners.filter(b => !b.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-6">
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className={banner.active ? "bg-green-500" : "bg-gray-500"}>
                      {banner.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {banner.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {banner.subtitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    Link: {banner.link}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMoveUp(banner.id)}
                      disabled={banner.order === 1}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMoveDown(banner.id)}
                      disabled={banner.order === banners.length}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(banner.id)}>
                        {banner.active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
