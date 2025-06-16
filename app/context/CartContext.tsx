"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

interface WishlistState {
  items: Product[]
}

interface AppState extends CartState {
  wishlist: WishlistState
  recentlyViewed: Product[]
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "ADD_TO_RECENTLY_VIEWED"; payload: Product }
  | { type: "LOAD_STATE"; payload: Partial<AppState> }

const CartContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: AppState, action: CartAction): AppState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        }
      } else {
        const newItem = { ...action.payload, quantity: 1 }
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        }
      }
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find((item) => item.id === action.payload)
      if (!itemToRemove) return state

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
        itemCount: state.itemCount - itemToRemove.quantity,
      }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (!item) return state

      const quantityDiff = quantity - item.quantity
      const updatedItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price * quantityDiff,
        itemCount: state.itemCount + quantityDiff,
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }

    case "ADD_TO_WISHLIST": {
      const isAlreadyInWishlist = state.wishlist.items.some((item) => item.id === action.payload.id)
      if (isAlreadyInWishlist) return state

      return {
        ...state,
        wishlist: {
          items: [...state.wishlist.items, action.payload],
        },
      }
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: {
          items: state.wishlist.items.filter((item) => item.id !== action.payload),
        },
      }

    case "ADD_TO_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter((item) => item.id !== action.payload.id)
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 10), // Keep only last 10 items
      }
    }

    case "LOAD_STATE":
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    wishlist: { items: [] },
    recentlyViewed: [],
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("amazonCloneState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: "LOAD_STATE", payload: parsedState })
      } catch (error) {
        console.error("Failed to load saved state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("amazonCloneState", JSON.stringify(state))
  }, [state])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
