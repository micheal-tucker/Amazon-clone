"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { useCart, type Product } from "../context/CartContext"

interface WishlistButtonProps {
  product: Product
  className?: string
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const { state, dispatch } = useCart()

  const isInWishlist = state.wishlist.items.some((item) => item.id === product.id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id })
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`} />
    </button>
  )
}
