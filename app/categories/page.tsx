import CategoryCard from "../components/CategoryCard"
import { categories } from "../data/categories"

export default function CategoriesPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
          <p className="text-lg text-gray-600">Discover everything you need across all our categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} size="large" />
          ))}
        </div>
      </div>
    </div>
  )
}
