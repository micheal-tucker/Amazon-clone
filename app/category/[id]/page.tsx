"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import NextImage from "next/image"
import { Filter, Grid, List } from "lucide-react"
import ProductCard from "../../components/ProductCard"
import { mockProducts } from "../../data/products"
import { getCategoryById } from "../../data/categories"
import type { Product } from "../../context/CartContext"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categoryId = params.id as string

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const category = getCategoryById(categoryId)

  useEffect(() => {
    let results = mockProducts.filter((product) => product.category === categoryId)

    // Apply price filter
    results = results.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply rating filter
    if (selectedRating) {
      results = results.filter((product) => product.rating.rate >= selectedRating)
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
      case "popularity":
        results.sort((a, b) => b.rating.count - a.rating.count)
        break
      case "newest":
        results.sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    setFilteredProducts(results)
  }, [categoryId, sortBy, priceRange, selectedRating])

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="text-gray-600 mt-2">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Category Header */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        <NextImage src={category.image} alt={category.name} fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg opacity-90 mb-2">{category.description}</p>
            <p className="text-sm opacity-75">{category.productCount.toLocaleString()} products available</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subcategories */}
        {category.subcategories && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Shop by Subcategory</h2>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{filteredProducts.length} results</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    [0, 25],
                    [25, 50],
                    [50, 100],
                    [100, 1000],
                  ].map(([min, max]) => (
                    <button
                      key={`${min}-${max}`}
                      onClick={() => setPriceRange([min, max])}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                    >
                      ${min} - ${max === 1000 ? "1000+" : max}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className="mr-2"
                    />
                    <span className="text-sm">{rating} Stars & Up</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-3">Brand</h3>
              <div className="space-y-2">
                {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className={viewMode === "list" ? "bg-white rounded-lg p-4 shadow-sm" : ""}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
