"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProductById } from "@/assets/api"
import ProductActions from "@/components/ProductActions"
import { Product } from "@/types/product"

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = Number(params.id)

    if (!Number.isInteger(id)) {
      router.replace("/404")
      return
    }

    async function fetchProduct() {
      try {
        const data = await getProductById(id)

        if (!data) {
          throw new Error("Failed to load product")
        }

        setProduct(data)
      } catch (err) {
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-red-600">
          Failed to load product
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    )
  }

  /* ---------------- SAFETY ---------------- */
  if (!product) return null

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-100 object-contain hover:scale-105 transition"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
              {product.category}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-lg">
                ⭐ {product.rating.rate}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-gray-900">
              ${product.price}
            </p>

            <p className="text-green-600 font-medium">
              In stock • Free delivery available
            </p>

            <div className="border-t pt-4">
              <h2 className="font-semibold text-gray-800 mb-2">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Client Actions */}
            <ProductActions product={product} />

            <div className="pt-4 text-sm text-gray-500">
              <p>✔ 7-day return policy</p>
              <p>✔ Secure payment</p>
              <p>✔ Genuine products</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
