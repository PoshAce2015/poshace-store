// Wishlist utilities — Supabase for authenticated users, localStorage for guests

const LOCAL_STORAGE_KEY = "poshace_wishlist";

export function getLocalWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToLocalWishlist(productId: string) {
  const items = getLocalWishlist();
  if (!items.includes(productId)) {
    items.push(productId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }
}

export function removeFromLocalWishlist(productId: string) {
  const items = getLocalWishlist().filter((id) => id !== productId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function isInLocalWishlist(productId: string): boolean {
  return getLocalWishlist().includes(productId);
}

export function clearLocalWishlist() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
