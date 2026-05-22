"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Upload, Sparkles, Image as ImageIcon, Type, Palette, Box, Gift, ShoppingCart, Eye, RotateCcw } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"

export default function CustomizePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [customText, setCustomText] = useState("")
  const [customNames, setCustomNames] = useState("")
  const [selectedShape, setSelectedShape] = useState("round")
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedFont, setSelectedFont] = useState("serif")
  const [selectedFrame, setSelectedFrame] = useState("none")
  const [selectedPackaging, setSelectedPackaging] = useState("standard")
  const [fontSize, setFontSize] = useState([24])
  const [textColor, setTextColor] = useState("#000000")

  const addItem = useCartStore((state: any) => state.addItem)

  const shapes = [
    { id: "round", name: "Round", price: 0 },
    { id: "heart", name: "Heart", price: 100 },
    { id: "oval", name: "Oval", price: 50 },
    { id: "square", name: "Square", price: 0 },
    { id: "rectangle", name: "Rectangle", price: 0 },
  ]

  const sizes = [
    { id: "small", name: "Small (3 inch)", price: 499 },
    { id: "medium", name: "Medium (4 inch)", price: 699 },
    { id: "large", name: "Large (5 inch)", price: 899 },
    { id: "xlarge", name: "Extra Large (6 inch)", price: 1199 },
  ]

  const fonts = [
    { id: "serif", name: "Serif", class: "font-serif" },
    { id: "sans", name: "Sans Serif", class: "font-sans" },
    { id: "script", name: "Script", class: "font-script" },
    { id: "display", name: "Display", class: "font-display" },
  ]

  const frames = [
    { id: "none", name: "No Frame", price: 0 },
    { id: "wood", name: "Wooden Stand", price: 199 },
    { id: "metal", name: "Metal Stand", price: 299 },
    { id: "acrylic", name: "Acrylic Stand", price: 249 },
  ]

  const packaging = [
    { id: "standard", name: "Standard Box", price: 0 },
    { id: "premium", name: "Premium Gift Box", price: 149 },
    { id: "luxury", name: "Luxury Wooden Box", price: 299 },
  ]

  const calculatePrice = () => {
    const basePrice = sizes.find((s) => s.id === selectedSize)?.price || 699
    const shapePrice = shapes.find((s) => s.id === selectedShape)?.price || 0
    const framePrice = frames.find((f) => f.id === selectedFrame)?.price || 0
    const packagingPrice = packaging.find((p) => p.id === selectedPackaging)?.price || 0
    return basePrice + shapePrice + framePrice + packagingPrice
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: Date.now().toString(),
      productId: "custom",
      quantity: 1,
      price: calculatePrice(),
      customImage: uploadedImage || undefined,
      customText: customText || undefined,
      customName: customNames || undefined,
      shape: selectedShape,
      size: selectedSize,
      frame: selectedFrame,
      packaging: selectedPackaging,
    })
  }

  const resetCustomization = () => {
    setUploadedImage(null)
    setCustomText("")
    setCustomNames("")
    setSelectedShape("round")
    setSelectedSize("medium")
    setSelectedFont("serif")
    setSelectedFrame("none")
    setSelectedPackaging("standard")
    setFontSize([24])
    setTextColor("#000000")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Customize Your Stone Art
          </h1>
          <p className="text-lg text-gray-600">
            Create a unique, personalized gift that will be treasured forever
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Eye className="mr-2 h-5 w-5" />
                    Live Preview
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetCustomization}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                
                {/* Stone Preview */}
                <div className="relative aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-3xl flex items-center justify-center p-8 shadow-2xl overflow-hidden">
                  {/* Stone Texture */}
                  <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')]"></div>
                  
                  {/* Uploaded Image */}
                  {uploadedImage && (
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Custom Text */}
                  {customText && (
                    <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                      <p
                        className={`${fonts.find((f) => f.id === selectedFont)?.class} font-bold`}
                        style={{ fontSize: `${fontSize[0]}px`, color: textColor }}
                      >
                        {customText}
                      </p>
                    </div>
                  )}
                  
                  {/* Custom Names */}
                  {customNames && (
                    <div className="absolute top-8 left-0 right-0 text-center z-20">
                      <p
                        className={`${fonts.find((f) => f.id === selectedFont)?.class} font-semibold`}
                        style={{ fontSize: `${fontSize[0] * 0.8}px`, color: textColor }}
                      >
                        {customNames}
                      </p>
                    </div>
                  )}
                  
                  {/* Placeholder when no image */}
                  {!uploadedImage && !customText && !customNames && (
                    <div className="text-center z-10">
                      <ImageIcon className="h-16 w-16 text-stone-400 mx-auto mb-4" />
                      <p className="text-stone-500">Upload an image to see preview</p>
                    </div>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price</span>
                    <span className="text-2xl font-bold text-amber-700">
                      ₹{calculatePrice()}
                    </span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="xl"
                  className="w-full mt-4"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="image" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="extras">Extras</TabsTrigger>
                  </TabsList>

                  {/* Image Tab */}
                  <TabsContent value="image" className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-2 block">Upload Your Photo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                        </label>
                      </div>
                    </div>

                    {uploadedImage && (
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setUploadedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  {/* Text Tab */}
                  <TabsContent value="text" className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-2 block">Custom Text</Label>
                      <Input
                        placeholder="Enter your custom text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        maxLength={50}
                      />
                      <p className="text-sm text-gray-500 mt-1">{customText.length}/50 characters</p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Names</Label>
                      <Input
                        placeholder="Enter names (e.g., Rahul & Priya)"
                        value={customNames}
                        onChange={(e) => setCustomNames(e.target.value)}
                        maxLength={30}
                      />
                      <p className="text-sm text-gray-500 mt-1">{customNames.length}/30 characters</p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Font Style</Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem key={font.id} value={font.id}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Font Size: {fontSize[0]}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        min={12}
                        max={48}
                        step={2}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Text Color</Label>
                      <div className="flex gap-2">
                        {["#000000", "#FFFFFF", "#8B4513", "#D2691E", "#FFD700", "#4A4A4A"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setTextColor(color)}
                            className={`w-10 h-10 rounded-full border-2 ${
                              textColor === color ? "border-amber-500" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Style Tab */}
                  <TabsContent value="style" className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-2 block">Stone Shape</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {shapes.map((shape) => (
                          <button
                            key={shape.id}
                            onClick={() => setSelectedShape(shape.id)}
                            className={`p-4 border-2 rounded-lg text-center transition-all ${
                              selectedShape === shape.id
                                ? "border-amber-500 bg-amber-50"
                                : "border-gray-200 hover:border-amber-300"
                            }`}
                          >
                            <div className="text-2xl mb-1">
                              {shape.id === "round" ? "⭕" : shape.id === "heart" ? "❤️" : shape.id === "oval" ? "🔵" : shape.id === "square" ? "⬜" : "▭"}
                            </div>
                            <p className="text-sm font-medium">{shape.name}</p>
                            {shape.price > 0 && (
                              <p className="text-xs text-amber-700">+₹{shape.price}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Stone Size</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.id}>
                              {size.name} - ₹{size.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  {/* Extras Tab */}
                  <TabsContent value="extras" className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-2 block">Frame / Stand</Label>
                      <Select value={selectedFrame} onValueChange={setSelectedFrame}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frames.map((frame) => (
                            <SelectItem key={frame.id} value={frame.id}>
                              {frame.name} {frame.price > 0 && `(+₹${frame.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Gift Packaging</Label>
                      <Select value={selectedPackaging} onValueChange={setSelectedPackaging}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {packaging.map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              {pkg.name} {pkg.price > 0 && `(+₹${pkg.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
