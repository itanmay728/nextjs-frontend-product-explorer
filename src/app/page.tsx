import { getProducts } from "@/assets/api"
import ProductGrid from "@/components/ProductGrid"

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="p-4">
      <ProductGrid />
    </main>
  )
}
