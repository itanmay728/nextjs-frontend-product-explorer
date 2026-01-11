export const runtime = "nodejs";
import { getProductById } from "@/assets/api"
import ProductActions from "@/components/ProductActions"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params
  const productId = Number(id)

  if (Number.isNaN(productId)) {
    notFound()
  }

  const product = await getProductById(productId)


  if (!product) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] object-contain hover:scale-105 transition"
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

            {/* 🔥 Client Actions */}
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
