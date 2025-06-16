"use client"

import { useState } from "react"
import NextImage from "next/image"
import { X, Star, ShoppingCart, Heart } from "lucide-react"
import { type Product, useCart } from "../context/CartContext"

interface QuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
    onClose()
  }

  const addToWishlist = () => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Quick View</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <NextImage
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">{renderStars(product.rating.rate)}</div>
                  <span className="ml-2 text-sm text-gray-500">({product.rating.count} reviews)</span>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">You Save: ${(product.price * 0.2).toFixed(2)} (17%)</p>
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={addToWishlist}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
