"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProductFormData {
  name: string
  sku: string
  description: string
  price: number
  originalPrice: number
  category: string
  stock: number
  bestseller: boolean
  featured: boolean
  customizable: boolean
  shapes: string
  sizes: string
  materials: string
  images: string[]
  seoTitle: string
  seoDescription: string
}

const categories = [
  "Couple Stones",
  "God Stone Art",
  "Wedding Gifts",
  "Pet Memorial",
  "Family Gifts",
  "Birthday Gifts",
  "Anniversary Gifts",
]

const shapeOptions = ["Round", "Oval", "Square", "Rectangle", "Heart", "Custom"]
const sizeOptions = ["Small (4x4)", "Medium (6x6)", "Large (8x8)", "Extra Large (10x10)"]
const materialOptions = ["Natural River Stone", "Black Marble", "White Marble", "Slate", "Granite"]

export default function ProductForm({ 
  initialData, 
  onSubmit, 
  onCancel 
}: { 
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    originalPrice: initialData?.originalPrice || 0,
    category: initialData?.category || "",
    stock: initialData?.stock || 0,
    bestseller: initialData?.bestseller || false,
    featured: initialData?.featured || false,
    customizable: initialData?.customizable || true,
    shapes: initialData?.shapes || shapeOptions.join(","),
    sizes: initialData?.sizes || sizeOptions.join(","),
    materials: initialData?.materials || materialOptions.join(","),
    images: initialData?.images || [],
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setFormData(prev => ({ ...prev, images: [...prev.images, base64] }))
        setImagePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    if (formData.images.length === 1) {
      setImagePreview("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bestseller"
                      checked={formData.bestseller}
                      onCheckedChange={(checked) => setFormData({ ...formData, bestseller: checked })}
                    />
                    <Label htmlFor="bestseller">Bestseller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="customizable"
                      checked={formData.customizable}
                      onCheckedChange={(checked) => setFormData({ ...formData, customizable: checked })}
                    />
                    <Label htmlFor="customizable">Customizable</Label>
                  </div>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shapes">Available Shapes</Label>
                  <div className="space-y-2">
                    {shapeOptions.map(shape => (
                      <div key={shape} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`shape-${shape}`}
                          checked={formData.shapes.includes(shape)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, shapes: [...formData.shapes, shape] })
                            } else {
                              setFormData({ ...formData, shapes: formData.shapes.filter(s => s !== shape) })
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={`shape-${shape}`}>{shape}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizes">Available Sizes</Label>
                  <div className="space-y-2">
                    {sizeOptions.map(size => (
                      <div key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, sizes: [...formData.sizes, size] })
                            } else {
                              setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) })
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materials">Materials</Label>
                  <div className="space-y-2">
                    {materialOptions.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`material-${material}`}
                          checked={formData.materials.includes(material)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, materials: [...formData.materials, material] })
                            } else {
                              setFormData({ ...formData, materials: formData.materials.filter(m => m !== material) })
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={`material-${material}`}>{material}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Drag and drop images here, or click to select
                    </p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Custom Stone Art - Personalized Gifts"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={3}
                    placeholder="Create personalized stone art gifts for your loved ones..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                {initialData ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
