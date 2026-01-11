<h1 align="center">🛒 Product Explorer Dashboard</h1>
 
<p align="center">
A modern, production-style e-commerce product explorer built with <strong>Next.js (App Router)</strong>,
<strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>.
</p>

---

## 📌 Overview

**Product Explorer Dashboard** is a frontend technical assignment project that demonstrates real-world frontend engineering practices such as:

- Component-based architecture
- API integration
- Client-side state management
- Responsive UI design
- Clean and maintainable code

The application fetches products from a public API and allows users to browse, search, filter, favorite, and manage products similar to a real e-commerce website.

---

## 🚀 Features

### 🛍️ Product Listing
- Fetches products from:
  https://fakestoreapi.com/products
- Displays products in a responsive grid
- Shows:
  - Product image
  - Title
  - Price
  - Category
- Skeleton loading state for better UX
- Graceful error handling

### 🔍 Search & Filtering
- Client-side search by product title
- Filter by categories:
  - Men
  - Women
  - Electronics
  - Jewelry
- Filter products by **Favorites**

### 📄 Product Details Page
- Dynamic routing using Next.js App Router
- URL format:
  /product/[id]
- Displays:
  - Large product image
  - Title
  - Description
  - Category
  - Price
  - Rating

### ❤️ Favorites
- Add / remove products from favorites
- Persisted using `localStorage`
- Dedicated Favorites filter
- Empty favorites state with user guidance
- Live favorites count badge in Navbar

### 🛒 Cart
- Add products to cart
- Dedicated Cart page:
  /cart
- Features:
  - Quantity increase/decrease
  - Remove items
  - Order summary
  - Cart total
- Cart state persisted using `localStorage`
- Live cart badge in Navbar

### 📱 Responsive Design
- Mobile-first layout
- Fully responsive on:
  - Mobile
  - Tablet
  - Desktop
- Mobile navigation drawer
- Touch-friendly UI

---

## 🧠 Technical Highlights

- Next.js App Router
- Server Components where appropriate
- Client Components for interactivity
- Typed API responses and props
- Context API for global filtering
- Custom browser events for cross-component state sync
- No `any` types used
- Clean and scalable folder structure

---

## 🏗️ Tech Stack

- Next.js – App Router & routing
- TypeScript – Type safety
- Tailwind CSS – Styling & responsiveness
- Fake Store API – Product data
- localStorage – Favorites & cart persistence

---

## 📂 Project Structure

```
src/
├── app/
│ ├── cart/
│ │ └── page.tsx
│ ├── product/
│ │ └── [id]/
│ │ └── page.tsx
│ └── page.tsx
│
├── components/
│ ├── Navbar.tsx
│ ├── ProductGrid.tsx
│ ├── ProductActions.tsx
│
├── context/
│ └── ProductFilterContext.tsx
│
├── assets/
│ └── api.ts
│
├── types/
│ └── product.ts
```
## 📜 License

```
©️2026

This project is licensed under the MIT License.
```