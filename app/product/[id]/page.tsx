"use client"

import { useParams } from "next/navigation"
import NextImage from "next/image"
import { Star, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useState, useEffect } from "react"
import { mockProducts } from "../../data/products"

// Mock product data (in a real app, this would come from an API)
// const mockProducts: Product[] = [
//   {
//     id: 1,
//     title: "Wireless Bluetooth Headphones",
//     price: 79.99,
//     description:
//       "Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, commuters, and professionals who demand the best audio experience.",
//     category: "electronics",
//     image: "/placeholder.svg?height=400&width=400&text=Headphones",
//     rating: { rate: 4.5, count: 120 },
//   },
//   {
//     id: 2,
//     title: "Smart Watch Series 8",
//     price: 299.99,
//     description:
//       "Stay connected and track your health with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, water resistance, and seamless smartphone integration.",
//     category: "electronics",
//     image: "/placeholder.svg?height=400&width=400&text=Smart+Watch",
//     rating: { rate: 4.8, count: 89 },
//   },
//   // Add more products as needed
// ]

export default function ProductDetail() {
  const params = useParams()
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)

  const productId = Number.parseInt(params.id as string)
  const product = mockProducts.find((p) => p.id === productId)

  useEffect(() => {
    if (product) {
      dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: product })
    }
  }, [product, dispatch])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <NextImage
                src={product.image || "/placeholder.svg?height=500&width=500"}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-100 rounded border-2 border-transparent hover:border-orange-400 cursor-pointer relative"
                >
                  <NextImage
                    src={product.image || "/placeholder.svg?height=64&width=64"}
                    alt={`${product.title} view ${i}`}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.title}</h1>

              <div className="flex items-center mt-2">
                <div className="flex items-center">{renderStars(product.rating.rate)}</div>
                <span className="ml-2 text-sm text-blue-600 hover:underline cursor-pointer">
                  {product.rating.count} ratings
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">List Price:</span>
                <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
              <p className="text-sm text-green-600 mt-1">You Save: ${(product.price * 0.2).toFixed(2)} (17%)</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm">FREE delivery by tomorrow</span>
              </div>

              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span className="text-sm">FREE Returns</span>
              </div>

              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm">2-year warranty included</span>
              </div>
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-full transition-colors"
                >
                  Add to Cart
                </button>
                <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-6 rounded-full transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">About this item</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-32 text-gray-600">Brand:</span>
                  <span>Premium Brand</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Model:</span>
                  <span>PB-{product.id}00</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Weight:</span>
                  <span>1.2 lbs</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Dimensions:</span>
                  <span>8 x 6 x 3 inches</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(5)}</div>
                    <span className="ml-2 font-medium">John D.</span>
                  </div>
                  <p className="text-sm text-gray-700">"Excellent product! Exactly as described and fast shipping."</p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(4)}</div>
                    <span className="ml-2 font-medium">Sarah M.</span>
                  </div>
                  <p className="text-sm text-gray-700">"Great quality for the price. Would recommend!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
