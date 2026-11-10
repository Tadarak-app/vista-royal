import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/catalog";

type CartLine = { productId: string; quantity: number };
type ResolvedCartLine = { product: Product; quantity: number };
type CartState = {
  lines: ResolvedCartLine[];
  itemCount: number;
  subtotalPkr: number;
  addItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "vista-royal-guest-cart-v1";
const CartContext = createContext<CartState | null>(null);

function readSavedCart(): CartLine[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(products.map((product) => product.id));
    return parsed.flatMap((line: unknown): CartLine[] => {
      if (!line || typeof line !== "object") return [];
      const candidate = line as Record<string, unknown>;
      if (typeof candidate.productId !== "string" || !validIds.has(candidate.productId)) return [];
      if (typeof candidate.quantity !== "number" || !Number.isInteger(candidate.quantity) || candidate.quantity < 1) return [];
      return [{ productId: candidate.productId, quantity: candidate.quantity }];
    }).slice(0, 100);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>(readSavedCart);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines)); } catch { /* storage can be unavailable */ }
  }, [rawLines]);

  const lines = useMemo<ResolvedCartLine[]>(() => {
    const productById = new Map(products.map((product) => [product.id, product]));
    return rawLines.flatMap((line) => {
      const product = productById.get(line.productId);
      return product ? [{ product, quantity: line.quantity }] : [];
    });
  }, [rawLines]);

  const value = useMemo<CartState>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotalPkr = lines.reduce((sum, line) => sum + line.product.pricePkr * line.quantity, 0);
    return {
      lines,
      itemCount,
      subtotalPkr,
      addItem(productId) {
        if (!products.some((product) => product.id === productId)) return;
        setRawLines((current) => {
          const found = current.find((line) => line.productId === productId);
          return found
            ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line)
            : [...current, { productId, quantity: 1 }];
        });
      },
      setQuantity(productId, quantity) {
        setRawLines((current) => quantity < 1
          ? current.filter((line) => line.productId !== productId)
          : current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(99, quantity) } : line));
      },
      removeItem(productId) {
        setRawLines((current) => current.filter((line) => line.productId !== productId));
      },
      clearCart() { setRawLines([]); },
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
