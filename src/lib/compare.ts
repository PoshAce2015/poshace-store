// Compare utilities — localStorage-based, max 4 products

const LOCAL_STORAGE_KEY = "poshace_compare";
const MAX_COMPARE = 4;

export function getCompareList(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToCompare(productId: string): boolean {
  const items = getCompareList();
  if (items.includes(productId)) return false;
  if (items.length >= MAX_COMPARE) return false;
  items.push(productId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  return true;
}

export function removeFromCompare(productId: string) {
  const items = getCompareList().filter((id) => id !== productId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function isInCompare(productId: string): boolean {
  return getCompareList().includes(productId);
}

export function clearCompare() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getCompareCount(): number {
  return getCompareList().length;
}

export const MAX_COMPARE_ITEMS = MAX_COMPARE;
