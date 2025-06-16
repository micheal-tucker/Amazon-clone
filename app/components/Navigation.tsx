"use client"

import Link from "next/link"
import { ShoppingCart, Menu, MapPin } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import SearchBar from "./SearchBar"

export default function Navigation() {
  const { state } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white">
      {/* Main Navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="text-white">amazon</span>
            <span className="text-orange-400">.com</span>
          </div>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <div>
            <div className="text-xs text-gray-300">Deliver to</div>
            <div className="font-bold">Freetown</div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          {/* Account */}
          <Link href="/login" className="hidden md:flex flex-col text-sm">
            <span className="text-xs">Hello, sign in</span>
            <span className="font-bold">Account & Lists</span>
          </Link>

          {/* Orders */}
          <Link href="/orders" className="hidden md:flex flex-col text-sm">
            <span className="text-xs">Returns</span>
            <span className="font-bold">& Orders</span>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="hidden md:flex flex-col text-sm">
            <span className="text-xs">Your</span>
            <span className="font-bold">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-center relative">
            <ShoppingCart className="w-8 h-8" />
            {state.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {state.itemCount}
              </span>
            )}
            <span className="hidden md:block ml-1 font-bold">Cart</span>
          </Link>

          {/* Mobile Menu */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="flex items-center space-x-6 text-sm">
          <button className="flex items-center">
            <Menu className="w-4 h-4 mr-1" />
            All
          </button>
          <Link href="/category/electronics" className="hover:text-orange-400">
            Electronics
          </Link>
          <Link href="/category/books" className="hover:text-orange-400">
            Books
          </Link>
          <Link href="/category/clothing" className="hover:text-orange-400">
            Fashion
          </Link>
          <Link href="/category/home" className="hover:text-orange-400">
            Home & Garden
          </Link>
          <Link href="/deals" className="hover:text-orange-400">
            Today's Deals
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-2">
          <Link href="/login" className="block py-2">
            Sign In
          </Link>
          <Link href="/orders" className="block py-2">
            Orders
          </Link>
          <Link href="/category/electronics" className="block py-2">
            Electronics
          </Link>
          <Link href="/category/books" className="block py-2">
            Books
          </Link>
          <Link href="/category/clothing" className="block py-2">
            Fashion
          </Link>
        </div>
      )}
    </header>
  )
}
