"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useProductFilter, Category } from "@/context/ProductFilterContext"

export default function Navbar() {
  const { category, setCategory } = useProductFilter()

  const [favoritesCount, setFavoritesCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const categories: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Men", value: "men's clothing" },
    { label: "Women", value: "women's clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelry", value: "jewelery" },
  ]

  /* ---------- Sync Favorites ---------- */
  useEffect(() => {
    const updateFavorites = () => {
      const stored = localStorage.getItem("favorites")
      setFavoritesCount(stored ? JSON.parse(stored).length : 0)
    }

    updateFavorites()
    window.addEventListener("favorites-updated", updateFavorites)
    window.addEventListener("storage", updateFavorites)

    return () => {
      window.removeEventListener("favorites-updated", updateFavorites)
      window.removeEventListener("storage", updateFavorites)
    }
  }, [])

  /* ---------- Sync Cart ---------- */
  useEffect(() => {
    const updateCart = () => {
      const stored = localStorage.getItem("cart")
      setCartCount(stored ? JSON.parse(stored).length : 0)
    }

    updateCart()
    window.addEventListener("cart-updated", updateCart)
    window.addEventListener("storage", updateCart)

    return () => {
      window.removeEventListener("cart-updated", updateCart)
      window.removeEventListener("storage", updateCart)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              setCategory("all")
              setMobileOpen(false)
            }}
            className="text-2xl font-bold text-indigo-600"
          >
            Products
          </Link>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 p-2 rounded-full">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href="/"
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    category === cat.value
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Favorites */}
            <Link
              href="/"
              onClick={() => setCategory("favorites")}
              className="relative rounded-full border border-gray-300 px-4 py-2
                         text-sm font-semibold text-gray-700 hover:border-red-500
                         hover:text-red-500 transition"
            >
              ❤️ Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
                                 rounded-full bg-red-500 text-white text-xs
                                 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* 🛒 Cart → /cart */}
            <Link
              href="/cart"
              className="relative rounded-full border border-gray-300 px-4 py-2
                         text-sm font-semibold text-gray-700 hover:border-indigo-600
                         hover:text-indigo-600 transition"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
                                 rounded-full bg-indigo-600 text-white text-xs
                                 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Contact */}
            <a
              href="mailto:ktanmay1130@email.com"
              className="hidden sm:inline-flex rounded-full bg-indigo-600 px-4 py-2
                         text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Contact
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-md border p-2"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-3 flex flex-col gap-2 rounded-xl bg-gray-100 p-3">

              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href="/"
                  onClick={() => {
                    setCategory(cat.value)
                    setMobileOpen(false)
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition
                    ${
                      category === cat.value
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat.label}
                </Link>
              ))}

              {/* Mobile Favorites */}
              <Link
                href="/"
                onClick={() => {
                  setCategory("favorites")
                  setMobileOpen(false)
                }}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-2
                           text-sm font-semibold"
              >
                ❤️ Favorites
                {favoritesCount > 0 && (
                  <span className="rounded-full bg-red-500 px-2 text-xs text-white">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Mobile Cart → /cart */}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-2
                           text-sm font-semibold"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="rounded-full bg-indigo-600 px-2 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <a
                href="mailto:ktanmay1130@email.com"
                className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-center
                           text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
