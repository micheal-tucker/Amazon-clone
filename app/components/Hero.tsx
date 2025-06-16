"use client"

import NextImage from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"

const heroSlides = [
  {
    id: 1,
    image: "/images/hero/electronics-sale.jpg",
    title: "Electronics Sale",
    subtitle: "Up to 50% off on latest gadgets",
    cta: "Shop Electronics",
    link: "/category/electronics",
    color: "text-white",
  },
  {
    id: 2,
    image: "/images/hero/fashion-deals.jpg",
    title: "Fashion Week Deals",
    subtitle: "Trendy styles at unbeatable prices",
    cta: "Shop Fashion",
    link: "/category/clothing",
    color: "text-white",
  },
  {
    id: 3,
    image: "/images/hero/home-garden.jpg",
    title: "Home & Garden",
    subtitle: "Transform your living space",
    cta: "Shop Home",
    link: "/category/home",
    color: "text-white",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <div className="relative h-96 md:h-[500px] bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      <div className="relative h-full">
        <NextImage
          src={currentSlideData.image}
          alt={currentSlideData.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${currentSlideData.color}`}>
              {currentSlideData.title}
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${currentSlideData.color} opacity-90`}>
              {currentSlideData.subtitle}
            </p>
            <Link
              href={currentSlideData.link}
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{currentSlideData.cta}</span>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
