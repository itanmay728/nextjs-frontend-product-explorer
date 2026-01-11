"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getProducts } from "@/assets/api"
import { Product } from "@/types/product"
import { useProductFilter } from "@/context/ProductFilterContext"

export default function ProductGrid() {
  const { category } = useProductFilter()

  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* ---------------- Fetch Products ---------------- */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  /* ---------------- Load Favorites ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  /* ---------------- Toggle Favorite ---------------- */
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]

      localStorage.setItem("favorites", JSON.stringify(updated))
      window.dispatchEvent(new Event("favorites-updated"))
      return updated
    })
  }

  /* ---------------- Filtering ---------------- */
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === "all" ||
      (category === "favorites" && favorites.includes(p.id)) ||
      p.category === category

    return matchesSearch && matchesCategory
  })

  /* ---------------- ERROR ---------------- */
  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>
  }

  /* ---------------- SKELETON LOADING ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-sm p-4 animate-pulse space-y-4"
          >
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-5 bg-gray-400 rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  /* ---------------- EMPTY FAVORITES ---------------- */
  if (category === "favorites" && favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
        <div className="text-5xl">❤️</div>
        <h2 className="text-xl font-semibold text-gray-800">
          No favorites yet
        </h2>
        <p className="text-gray-500">
          Please add products to your favorites
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-md border border-gray-400 px-4 py-2
                   focus:ring-2 focus:ring-indigo-500"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isFavorite = favorites.includes(product.id)

          return (
            <div
              key={product.id}
              className="relative rounded-sm border border-gray-200 bg-white
                         hover:shadow-xl transition"
            >
              {/* ❤️ Favorite Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleFavorite(product.id)
                }}
                className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow
                           hover:scale-110 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "red" : "none"}
                  stroke="red"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                       -1.935 0-3.597 1.126-4.312 2.733
                       -.715-1.607-2.377-2.733-4.313-2.733
                       C5.1 3.75 3 5.765 3 8.25
                       c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <Link href={`/product/${product.id}`}>
                <div className="h-56 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs text-indigo-600 uppercase">
                    {product.category}
                  </p>
                  <h2 className="font-semibold line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="font-bold">${product.price}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
