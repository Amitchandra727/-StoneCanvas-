"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, User, Heart, Search, Moon, Sun, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useThemeStore } from "@/stores/theme-store"
import SearchModal from "@/components/features/search-modal"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cartItems = useCartStore((state: { items: any[] }) => state.items)
  const wishlistItems = useWishlistStore((state: { items: any[] }) => state.items)
  const { isDarkMode, toggleDarkMode } = useThemeStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleSearchShortcut)
    return () => window.removeEventListener("keydown", handleSearchShortcut)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Customize", href: "/customize" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl shadow-amber-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 bg-clip-text text-transparent flex items-center gap-2"
              >
                <Sparkles className="h-6 w-6 text-amber-600" />
                StoneCanvas
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-amber-700 transition-colors font-medium relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => { toggleDarkMode(); console.log('Dark mode toggled:', !isDarkMode); }} className="hover:bg-amber-50 transition-colors">
                {isDarkMode ? <Sun className="h-5 w-5 text-amber-600" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-amber-50 transition-colors">
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative hover:bg-rose-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-700" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="icon" className="hover:bg-amber-50 transition-colors">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-amber-50 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/customize">
                <Button variant="luxury" size="sm" className="shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Customize
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-amber-50 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-100 shadow-xl"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-700 hover:text-amber-700 transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-3 pt-4 border-t border-amber-100">
                  <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-amber-50 transition-colors">
                    {isDarkMode ? <Sun className="h-5 w-5 text-amber-600" /> : <Moon className="h-5 w-5 text-gray-700" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-amber-50 transition-colors">
                    <Search className="h-5 w-5 text-gray-700" />
                  </Button>
                  <Link href="/wishlist">
                    <Button variant="ghost" size="icon" className="relative hover:bg-rose-50 transition-colors">
                      <Heart className="h-5 w-5 text-gray-700" />
                      {wishlistItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="hover:bg-amber-50 transition-colors">
                      <User className="h-5 w-5 text-gray-700" />
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative hover:bg-amber-50 transition-colors">
                      <ShoppingCart className="h-5 w-5 text-gray-700" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                          {cartItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div>
                <Link href="/customize">
                  <Button variant="luxury" className="w-full shadow-lg shadow-amber-500/30">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Customize Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
