export interface Category {
  id: string
  name: string
  image: string
  description: string
  productCount: number
  featured: boolean
  subcategories?: string[]
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "/images/categories/electronics.jpg",
    description: "Latest gadgets, computers, phones, and electronic devices",
    productCount: 1247,
    featured: true,
    subcategories: ["Smartphones", "Laptops", "Headphones", "Cameras", "Gaming"],
  },
  {
    id: "clothing",
    name: "Fashion & Clothing",
    image: "/images/categories/fashion.jpg",
    description: "Trendy clothing, shoes, and fashion accessories",
    productCount: 2341,
    featured: true,
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"],
  },
  {
    id: "home",
    name: "Home & Garden",
    image: "/images/categories/home-garden.jpg",
    description: "Everything for your home, garden, and outdoor spaces",
    productCount: 1893,
    featured: true,
    subcategories: ["Furniture", "Kitchen", "Garden", "Decor", "Tools"],
  },
  {
    id: "books",
    name: "Books & Media",
    image: "/images/categories/books.jpg",
    description: "Books, audiobooks, movies, and educational content",
    productCount: 5672,
    featured: true,
    subcategories: ["Fiction", "Non-Fiction", "Textbooks", "Children's Books", "Audiobooks"],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "/images/categories/sports.jpg",
    description: "Sports equipment, outdoor gear, and fitness accessories",
    productCount: 892,
    featured: false,
    subcategories: ["Fitness", "Outdoor Recreation", "Sports Equipment", "Athletic Wear"],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "/images/categories/beauty.jpg",
    description: "Skincare, makeup, fragrances, and personal care products",
    productCount: 1456,
    featured: false,
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Personal Care"],
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    description: "Bags, watches, jewelry, and fashion accessories",
    productCount: 743,
    featured: false,
    subcategories: ["Bags", "Watches", "Jewelry", "Sunglasses", "Belts"],
  },
]

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id)
}

export const getFeaturedCategories = (): Category[] => {
  return categories.filter((category) => category.featured)
}
