import Link from "next/link"
import { Mail, Phone, MapPin, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import NewsletterSignup from "@/components/features/newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              StoneCanvas
            </h3>
            <p className="text-gray-600">
              Turn your precious memories into timeless stone art. Premium personalized gifts for every occasion.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-amber-700 transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-700 transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-700 transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-700 transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collection" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Customize Now
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-amber-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/couple" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Couple Stones
                </Link>
              </li>
              <li>
                <Link href="/categories/god" className="text-gray-600 hover:text-amber-700 transition-colors">
                  God Stone Art
                </Link>
              </li>
              <li>
                <Link href="/categories/wedding" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Wedding Gifts
                </Link>
              </li>
              <li>
                <Link href="/categories/memorial" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Memorial Stones
                </Link>
              </li>
              <li>
                <Link href="/categories/decor" className="text-gray-600 hover:text-amber-700 transition-colors">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-amber-700" />
            <span className="text-gray-600">hello@stonecanvas.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-amber-700" />
            <span className="text-gray-600">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-amber-700" />
            <span className="text-gray-600">Mumbai, India</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-gray-600 text-sm">
          <p>&copy; 2024 StoneCanvas. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
