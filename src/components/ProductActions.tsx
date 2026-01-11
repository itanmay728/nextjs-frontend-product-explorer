"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"

export default function ProductActions({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favAnimating, setFavAnimating] = useState(false)
  const [cartAnimating, setCartAnimating] = useState(false)

  /* -------- Load favorite state -------- */
  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) {
      setIsFavorite(JSON.parse(stored).includes(product.id))
    }
  }, [product.id])

  /* -------- Add / Remove Favorite -------- */
  const toggleFavorite = () => {
    const stored = localStorage.getItem("favorites")
    const favorites: number[] = stored ? JSON.parse(stored) : []

    let updated: number[]
    if (favorites.includes(product.id)) {
      updated = favorites.filter((id) => id !== product.id)
      setIsFavorite(false)
    } else {
      updated = [...favorites, product.id]
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(updated))
    window.dispatchEvent(new Event("favorites-updated"))

    // animation
    setFavAnimating(true)
    setTimeout(() => setFavAnimating(false), 300)
  }

  /* -------- Add to Cart -------- */
  const addToCart = () => {
    const stored = localStorage.getItem("cart")
    const cart = stored ? JSON.parse(stored) : []

    cart.push({ ...product, quantity: 1 })
    localStorage.setItem("cart", JSON.stringify(cart))

    window.dispatchEvent(new Event("cart-updated"))

    // animation
    setCartAnimating(true)
    setTimeout(() => setCartAnimating(false), 300)
  }

  return (
    <div className="flex gap-4 pt-4">

      {/* Add to Cart */}
      <button
        onClick={addToCart}
        className={`flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold
                    hover:bg-indigo-700 transition
                    ${cartAnimating ? "scale-95 animate-pulse" : ""}`}
      >
        {cartAnimating ? "Added!" : "Add to Cart"}
      </button>

      {/* Add to Favorites */}
      <button
        onClick={toggleFavorite}
        className={`flex-1 rounded-lg border px-6 py-3 font-semibold transition
          ${
            isFavorite
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          }
          ${favAnimating ? "scale-95 animate-pulse" : ""}`}
      >
        {isFavorite ? "❤️ Favorited" : "♡ Add to Favorites"}
      </button>
    </div>
  )
}
