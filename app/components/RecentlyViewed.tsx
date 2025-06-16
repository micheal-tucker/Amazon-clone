"use client"

import { useCart } from "../context/CartContext"
import ProductCard from "./ProductCard"

export default function RecentlyViewed() {
  const { state } = useCart()

  if (state.recentlyViewed.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {state.recentlyViewed.slice(0, 5).map((product) => (
            <div key={product.id} className="scale-90">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
