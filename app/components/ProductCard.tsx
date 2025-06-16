"use client"

import type React from "react"
import NextImage from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Eye } from "lucide-react"
import { useState } from "react"
import { type Product, useCart } from "../context/CartContext"
import WishlistButton from "./WishlistButton"
import QuickView from "./QuickView"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()
  const [showQuickView, setShowQuickView] = useState(false)

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowQuickView(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
        <Link href={`/product/${product.id}`} className="flex flex-col h-full">
          <div className="relative h-48 p-4">
            <NextImage
              src={product.image}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={openQuickView}
                className="bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute top-2 right-2">
              <WishlistButton product={product} />
            </div>

            {/* Sale Badge */}
            {product.price < 100 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</div>
            )}
          </div>

          <div className="flex-1 flex flex-col p-4 pt-0">
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center mb-2">
              <div className="flex items-center">{renderStars(product.rating.rate)}</div>
              <span className="text-sm text-gray-500 ml-2">({product.rating.count.toLocaleString()})</span>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.price > 50 && <span className="text-xs text-green-600">FREE delivery</span>}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-4 pt-0">
          <button
            onClick={addToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <QuickView product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  )
}
