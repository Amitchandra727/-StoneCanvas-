"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const mockProducts = [
  { id: "1", name: "Romantic Couple Stone", price: 699, category: "Couple Stones" },
  { id: "2", name: "Divine Ganesh Stone", price: 899, category: "God Stone Art" },
  { id: "3", name: "Wedding Anniversary Gift", price: 999, category: "Wedding Gifts" },
  { id: "4", name: "Memorial Stone Pet", price: 599, category: "Pet Memorial" },
  { id: "5", name: "Motivational Desk Stone", price: 499, category: "Desk Stones" },
  { id: "6", name: "Home Decor Stone Art", price: 799, category: "Home Decor" },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(mockProducts)

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults(mockProducts)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() === "") {
      setResults(mockProducts)
    } else {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
  }, [query])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 border-0 focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-4">
                {results.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No products found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/collection`}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-amber-50 transition-colors group"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <span className="font-bold text-amber-700">₹{product.price}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 bg-amber-50 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Press <kbd className="px-2 py-1 bg-white rounded border">Esc</kbd> to close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
