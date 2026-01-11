import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store", // important for dynamic routes
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}
