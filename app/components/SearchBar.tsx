"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}&category=${category}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4">
      <div className="flex">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-200 text-black px-2 py-2 rounded-l-md text-sm border-r border-gray-300"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="beauty">Beauty</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Amazon"
          className="flex-1 px-4 py-2 text-black focus:outline-none"
        />
        <button type="submit" className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}
