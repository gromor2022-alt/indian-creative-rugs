"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getSalePrice } from "@/lib/pricing";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  shape: string;
  size: string;
  price: number;
  quantity: number;
};

/** Sets the item's unit price from the shared price table and current sale. */
function withCurrentPrice(item: CartItem): CartItem {
  const price = getSalePrice(item.shape, item.size);
  return price === null ? item : { ...item, price };
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string,
    size: string,
    shape: string
  ) => void;
  updateQuantity: (
    id: string,
    size: string,
    shape: string,
    quantity: number
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
useEffect(() => {
  try {
    const savedCart = localStorage.getItem("icr-cart");

    if (savedCart) {
      // Re-price saved items so carts filled before a sale started (or
      // ended) show the current price, which is what checkout charges.
      setCart(
        (JSON.parse(savedCart) as CartItem[]).map(withCurrentPrice)
      );
    }
  } catch {
    // Ignore unreadable or blocked storage; start with an empty cart.
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "icr-cart",
    JSON.stringify(cart)
  );
}, [cart]);

  const addToCart = (newItem: CartItem) => {
    const item = withCurrentPrice(newItem);

    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.size === item.size &&
          p.shape === item.shape
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id &&
          p.size === item.size &&
          p.shape === item.shape
            ? {
                ...p,
                quantity:
                  p.quantity + item.quantity,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (
    id: string,
    size: string,
    shape: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.shape === shape
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    shape: string,
    quantity: number
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === size &&
        item.shape === shape
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}