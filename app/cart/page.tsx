"use client"

import NextImage from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 h-32 relative bg-gray-100 rounded-lg overflow-hidden">
                    <NextImage
                      src={item.image || "/placeholder.svg?height=128&width=128"}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                      sizes="128px"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                    >
                      {item.title}
                    </Link>

                    <p className="text-green-600 text-sm">In Stock</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>

                        <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} items):</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(state.total * 0.08).toFixed(2)}</span>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(state.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full transition-colors block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
