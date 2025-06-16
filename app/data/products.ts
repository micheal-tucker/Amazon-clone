import type { Product } from "../context/CartContext"

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
    price: 279.99,
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charge.",
    category: "electronics",
    image: "/images/headphones.jpg",
    rating: { rate: 4.5, count: 1247 },
  },
  {
    id: 2,
    title: "Apple Watch Series 9 GPS 45mm",
    price: 429.99,
    description:
      "The most advanced Apple Watch yet. Featuring the new S9 chip, a magical new way to use your Apple Watch without touching the screen, and a brighter display.",
    category: "electronics",
    image: "/images/smartwatch.jpg",
    rating: { rate: 4.8, count: 892 },
  },
  {
    id: 3,
    title: "Unisex Premium Cotton T-Shirt",
    price: 24.99,
    description:
      "100% organic cotton t-shirt with a comfortable fit. Pre-shrunk fabric and side-seamed construction for durability. Available in multiple colors.",
    category: "clothing",
    image: "/images/tshirt.jpg",
    rating: { rate: 4.2, count: 1567 },
  },
  {
    id: 4,
    title: "Breville Bambino Plus Espresso Machine",
    price: 299.99,
    description:
      "Compact espresso machine with automatic milk texturing. 3-second heat up time and precise espresso extraction with rich crema.",
    category: "home",
    image: "/images/coffee-maker.jpg",
    rating: { rate: 4.6, count: 783 },
  },
  {
    id: 5,
    title: "The Seven Husbands of Evelyn Hugo",
    price: 16.99,
    description:
      "A captivating novel about a reclusive Hollywood icon who finally decides to tell her story to a young journalist. A tale of ambition, love, and the price of fame.",
    category: "books",
    image: "/images/book.jpg",
    rating: { rate: 4.7, count: 2341 },
  },
  {
    id: 6,
    title: "Manduka PRO Yoga Mat - 6mm Thick",
    price: 89.99,
    description:
      "Professional-grade yoga mat with superior cushioning and support. Non-slip surface and lifetime guarantee. Eco-friendly construction.",
    category: "sports",
    image: "/images/yoga-mat.jpg",
    rating: { rate: 4.4, count: 672 },
  },
  {
    id: 7,
    title: "Logitech MX Master 3S Wireless Mouse",
    price: 99.99,
    description:
      "Advanced wireless mouse with ultra-fast scrolling, customizable buttons, and works on any surface. Up to 70 days battery life.",
    category: "electronics",
    image: "/images/mouse.jpg",
    rating: { rate: 4.3, count: 1456 },
  },
  {
    id: 8,
    title: "CeraVe Daily Skincare Set",
    price: 49.99,
    description:
      "Complete skincare routine with cleanser, moisturizer, and sunscreen. Developed with dermatologists and suitable for all skin types.",
    category: "beauty",
    image: "/images/skincare.jpg",
    rating: { rate: 4.5, count: 923 },
  },
  {
    id: 9,
    title: "MacBook Air 13-inch M2 Chip",
    price: 1199.99,
    description:
      "Supercharged by the M2 chip, the redesigned MacBook Air combines incredible performance and up to 18 hours of battery life into its strikingly thin design.",
    category: "electronics",
    image: "/images/laptop.jpg",
    rating: { rate: 4.9, count: 567 },
  },
  {
    id: 10,
    title: "Nike Air Max 270 Running Shoes",
    price: 149.99,
    description:
      "Inspired by two icons of big Air: the Air Max 180 and Air Max 93. Features Nike's biggest heel Air unit yet for a super-soft ride.",
    category: "clothing",
    image: "/images/sneakers.jpg",
    rating: { rate: 4.4, count: 1834 },
  },
  {
    id: 11,
    title: "Peak Design Everyday Backpack 20L",
    price: 259.95,
    description:
      "Award-winning camera and laptop backpack with weatherproof construction. Modular internal organization and lifetime warranty.",
    category: "accessories",
    image: "/images/backpack.jpg",
    rating: { rate: 4.7, count: 445 },
  },
  {
    id: 12,
    title: "iPhone 15 Pro 128GB",
    price: 999.99,
    description:
      "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system. Features Action Button and USB-C connectivity.",
    category: "electronics",
    image: "/images/phone.jpg",
    rating: { rate: 4.8, count: 1123 },
  },
]

export const categories = [
  { id: "electronics", name: "Electronics", count: 156 },
  { id: "clothing", name: "Clothing & Fashion", count: 234 },
  { id: "home", name: "Home & Garden", count: 189 },
  { id: "books", name: "Books", count: 567 },
  { id: "sports", name: "Sports & Outdoors", count: 123 },
  { id: "beauty", name: "Beauty & Personal Care", count: 98 },
  { id: "accessories", name: "Accessories", count: 76 },
]
