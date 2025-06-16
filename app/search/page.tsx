"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { mockProducts } from "../data/products"
import type { Product } from "../context/CartContext"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || "all"

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    let results = mockProducts

    // Filter by search query
    if (query) {
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by category
    if (category !== "all") {
      results = results.filter((product) => product.category === category)
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case "newest":
        results.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredProducts(results)
  }, [query, category, sortBy])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} results {category !== "all" && `in ${category}`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Sort by</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Under $25</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$25 to $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$50 to $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$100 & Above</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{rating} Stars & Up</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
