"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  parseCSV,
  parseMagentoRow,
  extractCategories,
  extractBrands,
} from "@/lib/import/magento-parser";

export async function uploadImportAction(formData: FormData) {
  const supabase = createAdminClient();
  const source = formData.get("source") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    throw new Error("No file uploaded");
  }

  // Upload file to Supabase Storage
  const fileName = `imports/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("imports")
    .upload(fileName, file);

  if (uploadError?.message?.includes("not found")) {
    await supabase.storage.createBucket("imports", { public: false });
    await supabase.storage.from("imports").upload(fileName, file);
  }

  // Read and parse CSV
  const text = await file.text();
  const rows = parseCSV(text);
  const totalRows = rows.length;

  // Create import batch
  const { data: batch, error: batchError } = await supabase
    .from("import_batches")
    .insert({
      source,
      file_name: file.name,
      file_url: fileName,
      total_rows: totalRows,
      status: "processing",
      started_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (batchError) throw new Error(`Failed to create batch: ${batchError.message}`);

  // Parse all rows
  const parsedProducts = rows
    .map(parseMagentoRow)
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // Extract and insert categories
  const categories = extractCategories(parsedProducts);
  const categoryIdMap = new Map<string, string>();

  for (const cat of categories) {
    const parentId = cat.parent_path ? categoryIdMap.get(cat.parent_path) || null : null;

    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("path", cat.path)
      .single();

    if (existing) {
      categoryIdMap.set(cat.path, existing.id);
    } else {
      const { data: newCat } = await supabase
        .from("categories")
        .insert({
          name: cat.name,
          slug: cat.slug,
          path: cat.path,
          depth: cat.depth,
          parent_id: parentId,
        })
        .select("id")
        .single();

      if (newCat) categoryIdMap.set(cat.path, newCat.id);
    }
  }

  // Extract and insert brands
  const brands = extractBrands(parsedProducts);
  const brandIdMap = new Map<string, string>();

  for (const brand of brands) {
    const { data: existing } = await supabase
      .from("brands")
      .select("id")
      .eq("slug", brand.slug)
      .single();

    if (existing) {
      brandIdMap.set(brand.slug, existing.id);
    } else {
      const { data: newBrand } = await supabase
        .from("brands")
        .insert({ name: brand.name, slug: brand.slug })
        .select("id")
        .single();

      if (newBrand) brandIdMap.set(brand.slug, newBrand.id);
    }
  }

  // Insert products in batches
  let successCount = 0;
  let errorCount = 0;
  const BATCH_SIZE = 100;

  for (let i = 0; i < parsedProducts.length; i += BATCH_SIZE) {
    const chunk = parsedProducts.slice(i, i + BATCH_SIZE);

    for (const mp of chunk) {
      try {
        // Check for existing product by slug
        const { data: existing } = await supabase
          .from("products")
          .select("id")
          .eq("slug", mp.url_key)
          .single();

        if (existing) {
          // Update existing product
          await supabase
            .from("products")
            .update({
              title: mp.name,
              description: mp.description || null,
              short_description: mp.short_description || null,
              meta_title: mp.meta_title || null,
              meta_description: mp.meta_description || null,
              primary_image_url: mp.base_image || null,
              brand_id: mp.brand ? brandIdMap.get(slugifyBrand(mp.brand)) || null : null,
              status: mp.status === "Enabled" ? "active" : "inactive",
              publish_status: mp.status === "Enabled" ? "published" : "unpublished",
              magento_url: mp.url_key,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);

          // Update variant
          await supabase
            .from("product_variants")
            .update({
              price: mp.price,
              compare_at_price: mp.special_price,
              inventory_quantity: mp.qty,
              inventory_status: mp.is_in_stock ? "in_stock" : "out_of_stock",
              weight_grams: mp.weight ? Math.round(mp.weight * 1000) : null,
            })
            .eq("product_id", existing.id);

          successCount++;
          continue;
        }

        // Create new product
        const { data: product, error: prodError } = await supabase
          .from("products")
          .insert({
            title: mp.name,
            slug: mp.url_key,
            magento_url: mp.url_key,
            description: mp.description || null,
            short_description: mp.short_description || null,
            meta_title: mp.meta_title || null,
            meta_description: mp.meta_description || null,
            primary_image_url: mp.base_image || null,
            brand_id: mp.brand ? brandIdMap.get(slugifyBrand(mp.brand)) || null : null,
            product_type: mp.product_type === "configurable" ? "configurable" : "simple",
            status: mp.status === "Enabled" ? "active" : "inactive",
            publish_status: mp.status === "Enabled" ? "published" : "unpublished",
          })
          .select("id")
          .single();

        if (prodError || !product) {
          errorCount++;
          continue;
        }

        // Create variant
        await supabase.from("product_variants").insert({
          product_id: product.id,
          sku: mp.sku,
          price: mp.price,
          compare_at_price: mp.special_price,
          inventory_quantity: mp.qty,
          inventory_status: mp.is_in_stock ? "in_stock" : "out_of_stock",
          weight_grams: mp.weight ? Math.round(mp.weight * 1000) : null,
        });

        // Create category assignments
        for (const catPath of mp.categories) {
          const cleanPath = catPath
            .replace(/^Default Category\/?/, "")
            .split("/")
            .map((p) => slugifyBrand(p.trim()))
            .join("/");

          const categoryId = categoryIdMap.get(cleanPath);
          if (categoryId) {
            await supabase
              .from("product_categories")
              .upsert(
                { product_id: product.id, category_id: categoryId, is_primary: mp.categories.indexOf(catPath) === 0 },
                { onConflict: "product_id,category_id" }
              );
          }
        }

        // Create identifiers
        const identifiers: { product_id: string; identifier_type: string; identifier_value: string; source: string }[] = [];
        if (mp.asin) identifiers.push({ product_id: product.id, identifier_type: "asin", identifier_value: mp.asin, source: "magento_import" });
        if (mp.upc) identifiers.push({ product_id: product.id, identifier_type: "upc", identifier_value: mp.upc, source: "magento_import" });

        if (identifiers.length > 0) {
          for (const ident of identifiers) {
            try {
              await supabase.from("product_identifiers").upsert(ident, { onConflict: "identifier_type,identifier_value" });
            } catch {
              // Skip duplicate identifier errors
            }
          }
        }

        // Create media entries for additional images
        if (mp.additional_images.length > 0) {
          const mediaEntries = mp.additional_images
            .filter(Boolean)
            .map((url, idx) => ({
              product_id: product.id,
              url,
              sort_order: idx + 1,
              role: idx === 0 ? "gallery" as const : "gallery" as const,
            }));

          if (mediaEntries.length > 0) {
            try {
              await supabase.from("product_media").insert(mediaEntries);
            } catch {
              // Skip media insert errors
            }
          }
        }

        successCount++;
      } catch {
        errorCount++;
      }
    }

    // Update batch progress
    await supabase
      .from("import_batches")
      .update({
        processed_rows: Math.min(i + BATCH_SIZE, parsedProducts.length),
        success_rows: successCount,
        error_rows: errorCount,
      })
      .eq("id", batch.id);
  }

  // Finalize batch
  await supabase
    .from("import_batches")
    .update({
      status: "completed",
      processed_rows: parsedProducts.length,
      success_rows: successCount,
      error_rows: errorCount,
      auto_published: successCount,
      completed_at: new Date().toISOString(),
    })
    .eq("id", batch.id);

  redirect("/admin/catalog/import");
}

function slugifyBrand(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-|-$/g, "");
}
