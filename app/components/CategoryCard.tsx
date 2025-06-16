"use client"

import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Category } from "../data/categories"

interface CategoryCardProps {
  category: Category
  size?: "small" | "medium" | "large"
}

export default function CategoryCard({ category, size = "medium" }: CategoryCardProps) {
  const sizeClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64",
  }

  return (
    <Link href={`/category/${category.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          <NextImage
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg mb-1">{category.name}</h3>
            <p className="text-sm opacity-90">{category.productCount.toLocaleString()} items</p>
          </div>
          <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
          {category.subcategories && (
            <div className="mt-2 flex flex-wrap gap-1">
              {category.subcategories.slice(0, 3).map((sub) => (
                <span key={sub} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {sub}
                </span>
              ))}
              {category.subcategories.length > 3 && (
                <span className="text-xs text-gray-500">+{category.subcategories.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
