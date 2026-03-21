"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function saveProductAction(formData: FormData) {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;
  const isNew = !id;

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);

  const productData = {
    title,
    slug,
    brand_id: (formData.get("brand_id") as string) || null,
    product_type: (formData.get("product_type") as string) || "simple",
    status: (formData.get("status") as string) || "draft",
    publish_status: (formData.get("publish_status") as string) || "unpublished",
    short_description: (formData.get("short_description") as string) || null,
    description: (formData.get("description") as string) || null,
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
    primary_image_url: (formData.get("primary_image_url") as string) || null,
    updated_at: new Date().toISOString(),
  };

  let productId: string;

  if (isNew) {
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    productId = data.id;
  } else {
    const { error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id);

    if (error) throw new Error(`Failed to update product: ${error.message}`);
    productId = id;
  }

  // Upsert the default variant
  const sku = formData.get("sku") as string;
  const price = parseFloat(formData.get("price") as string);
  const compareAtPrice = formData.get("compare_at_price")
    ? parseFloat(formData.get("compare_at_price") as string)
    : null;
  const inventoryQuantity = parseInt(
    (formData.get("inventory_quantity") as string) || "0"
  );
  const weightGrams = formData.get("weight_grams")
    ? parseInt(formData.get("weight_grams") as string)
    : null;
  const barcode = (formData.get("barcode") as string) || null;

  if (sku && price) {
    const variantData = {
      product_id: productId,
      sku,
      price,
      compare_at_price: compareAtPrice,
      inventory_quantity: inventoryQuantity,
      inventory_status: inventoryQuantity > 0 ? "in_stock" : "out_of_stock",
      weight_grams: weightGrams,
      barcode,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      await supabase.from("product_variants").insert(variantData);
    } else {
      // Check if variant exists
      const { data: existing } = await supabase
        .from("product_variants")
        .select("id")
        .eq("product_id", productId)
        .limit(1)
        .single();

      if (existing) {
        await supabase
          .from("product_variants")
          .update(variantData)
          .eq("id", existing.id);
      } else {
        await supabase.from("product_variants").insert(variantData);
      }
    }
  }

  // Upsert identifiers
  const identifiers: { type: string; value: string }[] = [];
  const asin = formData.get("asin") as string;
  const gtin = formData.get("gtin") as string;
  const mpn = formData.get("mpn") as string;
  const isbn = formData.get("isbn") as string;

  if (asin) identifiers.push({ type: "asin", value: asin });
  if (gtin) identifiers.push({ type: "gtin", value: gtin });
  if (mpn) identifiers.push({ type: "mpn", value: mpn });
  if (isbn) identifiers.push({ type: "isbn", value: isbn });

  if (identifiers.length > 0) {
    // Delete existing and re-insert
    await supabase
      .from("product_identifiers")
      .delete()
      .eq("product_id", productId);

    await supabase.from("product_identifiers").insert(
      identifiers.map((i) => ({
        product_id: productId,
        identifier_type: i.type,
        identifier_value: i.value,
        source: "manual",
      }))
    );
  }

  redirect("/admin/catalog/products");
}
