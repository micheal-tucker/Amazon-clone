import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"
import CategoryCard from "./components/CategoryCard"
import NextImage from "next/image"
import Link from "next/link"
import { mockProducts } from "./data/products"
import { getFeaturedCategories } from "./data/categories"
import RecentlyViewed from "./components/RecentlyViewed"

export default function Home() {
  const featuredCategories = getFeaturedCategories()
  const featuredProducts = mockProducts.slice(0, 8)
  const dealsProducts = mockProducts.slice(0, 6)

  return (
    <div className="bg-gray-100 min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Categories →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} size="medium" />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/search" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Today's Deals */}
        <section className="mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Deals</h2>
              <Link href="/deals" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Deals →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealsProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 relative">
                    <NextImage src={product.image} alt={product.title} fill className="object-contain" sizes="80px" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">${(product.price * 0.8).toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">20% OFF</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banners */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
                  <p className="mb-4">On orders over $50</p>
                  <Link
                    href="/search"
                    className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-48 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">30-Day Returns</h3>
                  <p className="mb-4">Hassle-free returns</p>
                  <Link
                    href="/returns"
                    className="bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RecentlyViewed />
      </div>
    </div>
  )
}
