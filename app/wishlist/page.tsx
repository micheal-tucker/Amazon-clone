"use client"

import Link from "next/link"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"

export default function WishlistPage() {
  const { state } = useCart()

  if (state.wishlist.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save items you love by clicking the heart icon</p>
          <Link
            href="/"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded-full transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist ({state.wishlist.items.length} items)</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {state.wishlist.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
