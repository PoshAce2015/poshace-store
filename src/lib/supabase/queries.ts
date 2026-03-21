import { createAdminClient } from "./admin";
import type { Database } from "./types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Brand = Database["public"]["Tables"]["brands"]["Row"];

// ─── Product queries ────────────────────────────────────────

export async function getProducts({
  page = 1,
  pageSize = 25,
  status,
  publishStatus,
  brandId,
  search,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
  publishStatus?: string;
  brandId?: string;
  search?: string;
} = {}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("products")
    .select(
      `*, brand:brands(id, name, slug), variants:product_variants(id, sku, price, compare_at_price, inventory_status, inventory_quantity), primary_category:product_categories!inner(category:categories(id, name, path))`,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (status) query = query.eq("status", status);
  if (publishStatus) query = query.eq("publish_status", publishStatus);
  if (brandId) query = query.eq("brand_id", brandId);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { products: data, total: count ?? 0 };
}

export async function getProductBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `*, brand:brands(*), variants:product_variants(*), media:product_media(*), identifiers:product_identifiers(*), categories:product_categories(*, category:categories(*)), attributes:product_attribute_values(*, attribute:attribute_definitions(*))`
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getProductById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `*, brand:brands(*), variants:product_variants(*), media:product_media(*), identifiers:product_identifiers(*), categories:product_categories(*, category:categories(*)), attributes:product_attribute_values(*, attribute:attribute_definitions(*))`
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProduct(
  product: Database["public"]["Tables"]["products"]["Insert"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: string,
  updates: Database["public"]["Tables"]["products"]["Update"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function bulkUpdateProducts(
  ids: string[],
  updates: Database["public"]["Tables"]["products"]["Update"]
) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .in("id", ids);

  if (error) throw error;
}

// ─── Variant queries ────────────────────────────────────────

export async function createVariant(
  variant: Database["public"]["Tables"]["product_variants"]["Insert"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("product_variants")
    .insert(variant)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateVariant(
  id: string,
  updates: Database["public"]["Tables"]["product_variants"]["Update"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("product_variants")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Category queries ───────────────────────────────────────

export async function getCategories() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("path")
    .order("sort_order");

  if (error) throw error;
  return data;
}

export async function getCategoryByPath(path: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("path", path)
    .single();

  if (error) throw error;
  return data;
}

export async function createCategory(
  category: Database["public"]["Tables"]["categories"]["Insert"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Brand queries ──────────────────────────────────────────

export async function getBrands() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function createBrand(
  brand: Database["public"]["Tables"]["brands"]["Insert"]
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .insert(brand)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── Storefront queries (use anon key via RLS) ─────────────

export async function getPublishedProducts({
  categoryPath,
  brandSlug,
  page = 1,
  pageSize = 24,
  sort = "newest",
}: {
  categoryPath?: string;
  brandSlug?: string;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "popular";
}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("products")
    .select(
      `id, title, slug, primary_image_url, catalog_score, brand:brands(name, slug), variants:product_variants(id, price, compare_at_price, inventory_status)`,
      { count: "exact" }
    )
    .eq("status", "active")
    .eq("publish_status", "published")
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (sort === "newest") query = query.order("created_at", { ascending: false });
  if (sort === "popular") query = query.order("catalog_score", { ascending: false });

  const { data, error, count } = await query;
  if (error) throw error;
  return { products: data ?? [], total: count ?? 0 };
}

export async function getPublishedProductBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `*, brand:brands(*), variants:product_variants(*), media:product_media(*), identifiers:product_identifiers(*), categories:product_categories(*, category:categories(*)), attributes:product_attribute_values(*, attribute:attribute_definitions(*))`
    )
    .eq("slug", slug)
    .eq("status", "active")
    .eq("publish_status", "published")
    .single();

  if (error) throw error;
  return data;
}
