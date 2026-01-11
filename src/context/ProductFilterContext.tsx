"use client"

import { createContext, useContext, useState } from "react"

export type Category =
  | "all"
  | "men's clothing"
  | "women's clothing"
  | "electronics"
  | "jewelery"
  | "favorites"

interface FilterContextType {
  category: Category
  setCategory: (category: Category) => void
}

const FilterContext = createContext<FilterContextType | null>(null)

export function ProductFilterProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [category, setCategory] = useState<Category>("all")

  return (
    <FilterContext.Provider value={{ category, setCategory }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useProductFilter() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useProductFilter must be used within ProductFilterProvider")
  }
  return context
}
