import ProductCard from "../components/ProductCard"
import { mockProducts } from "../data/products"

export default function DealsPage() {
  // Mock deals - in real app, this would be filtered from API
  const dealsProducts = mockProducts.map((product) => ({
    ...product,
    price: product.price * 0.8, // 20% off
  }))

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Today's Deals</h1>
          <p className="text-lg text-gray-600">Limited time offers - save up to 50% on selected items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealsProducts.map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                20% OFF
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
