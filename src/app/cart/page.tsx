"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Product } from "@/types/product"

interface CartItem extends Product {
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  /* -------- Load Cart -------- */
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    setCart(stored ? JSON.parse(stored) : [])
  }, [])

  /* -------- Update Cart -------- */
  const updateCart = (updated: CartItem[]) => {
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cart-updated"))
  }

  /* -------- Remove Item -------- */
  const removeItem = (id: number) => {
    updateCart(cart.filter((item) => item.id !== id))
  }

  /* -------- Quantity -------- */
  const changeQty = (id: number, qty: number) => {
    if (qty < 1) return
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    )
  }

  /* -------- Total -------- */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  /* -------- Empty Cart -------- */
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-5xl">🛒</div>
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT: Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 object-contain bg-gray-100 rounded"
                />

                <div className="flex-1">
                  <h2 className="font-semibold line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        changeQty(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 border rounded"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        changeQty(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="flex justify-between text-sm">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="w-full rounded-lg bg-indigo-600 px-4 py-3
                         text-white font-semibold hover:bg-indigo-700"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
