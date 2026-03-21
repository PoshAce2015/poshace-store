/**
 * Magento 2 CSV Export Parser
 *
 * Handles the standard Magento 2 product export format with these key columns:
 * sku, name, url_key, price, special_price, qty, is_in_stock,
 * categories, description, short_description, meta_title, meta_description,
 * base_image, additional_images, weight, product_type, additional_attributes
 *
 * The url_key is CRITICAL — it becomes the product slug, which maps to
 * /{url_key}.html URLs that must match Google Merchant Center links.
 */

export interface MagentoProduct {
  sku: string;
  name: string;
  url_key: string;
  price: number;
  special_price: number | null;
  qty: number;
  is_in_stock: boolean;
  categories: string[]; // ["Default Category/Electronics/Headphones"]
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  base_image: string;
  additional_images: string[];
  weight: number | null;
  product_type: string;
  brand: string;
  asin: string;
  upc: string;
  visibility: string;
  status: string; // "Enabled" or "Disabled"
  additional_attributes: Record<string, string>;
}

export interface ParsedCategory {
  name: string;
  slug: string;
  path: string;
  depth: number;
  parent_path: string | null;
}

/**
 * Parse a single row from Magento CSV into our normalized format
 */
export function parseMagentoRow(row: Record<string, string>): MagentoProduct | null {
  const sku = row.sku?.trim();
  const name = row.name?.trim();
  const urlKey = row.url_key?.trim();

  // Skip rows without essential fields
  if (!sku || !name) return null;

  // Parse additional_attributes (format: "brand=Samsung,color=Black,asin=B0ABC123")
  const additionalAttrs: Record<string, string> = {};
  if (row.additional_attributes) {
    const parts = row.additional_attributes.split(",");
    for (const part of parts) {
      const eqIndex = part.indexOf("=");
      if (eqIndex > 0) {
        const key = part.substring(0, eqIndex).trim().toLowerCase();
        const value = part.substring(eqIndex + 1).trim();
        additionalAttrs[key] = value;
      }
    }
  }

  // Parse categories (format: "Default Category/Electronics/Headphones,Default Category/Electronics")
  const categories: string[] = [];
  if (row.categories) {
    const catPaths = row.categories.split(",").map((c) => c.trim());
    for (const catPath of catPaths) {
      if (catPath && catPath !== "Default Category") {
        categories.push(catPath);
      }
    }
  }

  // Parse additional images (format: "image1.jpg,image2.jpg")
  const additionalImages: string[] = [];
  if (row.additional_images) {
    additionalImages.push(
      ...row.additional_images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean)
    );
  }

  const price = parseFloat(row.price || "0");
  const specialPrice = row.special_price ? parseFloat(row.special_price) : null;
  const qty = parseInt(row.qty || "0");
  const isInStock = row.is_in_stock === "1" || row.is_in_stock?.toLowerCase() === "true";
  const weight = row.weight ? parseFloat(row.weight) : null;

  return {
    sku,
    name,
    url_key: urlKey || slugify(name),
    price: specialPrice && specialPrice < price ? specialPrice : price,
    special_price: specialPrice && specialPrice < price ? price : null, // flip: our compare_at_price = MRP
    qty,
    is_in_stock: isInStock,
    categories,
    description: row.description || "",
    short_description: row.short_description || "",
    meta_title: row.meta_title || "",
    meta_description: row.meta_description || "",
    base_image: normalizeImageUrl(row.base_image || ""),
    additional_images: additionalImages.map(normalizeImageUrl),
    weight,
    product_type: row.product_type || "simple",
    brand: additionalAttrs.brand || additionalAttrs.manufacturer || "",
    asin: additionalAttrs.asin || "",
    upc: additionalAttrs.upc || additionalAttrs.ean || "",
    visibility: row.visibility || "Catalog, Search",
    status: row.product_online === "1" ? "Enabled" : (row.status || "Enabled"),
    additional_attributes: additionalAttrs,
  };
}

/**
 * Extract unique categories from all parsed products and build hierarchy
 */
export function extractCategories(
  products: MagentoProduct[]
): ParsedCategory[] {
  const categoryMap = new Map<string, ParsedCategory>();

  for (const product of products) {
    for (const catPath of product.categories) {
      // Remove "Default Category/" prefix
      const cleanPath = catPath.replace(/^Default Category\/?/, "");
      if (!cleanPath) continue;

      // Build each level of the hierarchy
      const parts = cleanPath.split("/");
      for (let i = 0; i < parts.length; i++) {
        const name = parts[i].trim();
        const pathParts = parts.slice(0, i + 1).map((p) => slugify(p.trim()));
        const path = pathParts.join("/");
        const parentPath = i > 0 ? pathParts.slice(0, i).join("/") : null;

        if (!categoryMap.has(path)) {
          categoryMap.set(path, {
            name,
            slug: slugify(name),
            path,
            depth: i,
            parent_path: parentPath,
          });
        }
      }
    }
  }

  // Sort by path for proper insertion order (parents before children)
  return Array.from(categoryMap.values()).sort((a, b) =>
    a.path.localeCompare(b.path)
  );
}

/**
 * Extract unique brands from parsed products
 */
export function extractBrands(
  products: MagentoProduct[]
): { name: string; slug: string }[] {
  const brandMap = new Map<string, string>();

  for (const product of products) {
    if (product.brand) {
      const slug = slugify(product.brand);
      if (!brandMap.has(slug)) {
        brandMap.set(slug, product.brand);
      }
    }
  }

  return Array.from(brandMap.entries())
    .map(([slug, name]) => ({ name, slug }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Parse CSV text into rows (handles quoted fields with commas)
 */
export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = (values[j] || "").trim();
    }

    rows.push(row);
  }

  return rows;
}

/**
 * Parse a single CSV line respecting quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

/**
 * Normalize Magento image URLs
 * Magento uses paths like "/m/a/main-image.jpg" which need the full media URL prefix
 */
function normalizeImageUrl(path: string): string {
  if (!path || path === "no_selection") return "";

  // Already a full URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Relative path from Magento — prepend the media base URL
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `https://poshace.com/media/catalog/product${cleanPath}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-|-$/g, "");
}
