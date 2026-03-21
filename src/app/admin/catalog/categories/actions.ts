"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createCategoryAction(formData: FormData) {
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const parentId = (formData.get("parent_id") as string) || null;
  const googleCategoryId = (formData.get("google_category_id") as string) || null;
  const seoDescription = (formData.get("seo_description") as string) || null;

  // Build path from parent
  let path = slug;
  let depth = 0;

  if (parentId) {
    const { data: parent } = await supabase
      .from("categories")
      .select("path, depth")
      .eq("id", parentId)
      .single();

    if (parent) {
      path = `${parent.path}/${slug}`;
      depth = parent.depth + 1;
    }
  }

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    path,
    depth,
    parent_id: parentId,
    google_category_id: googleCategoryId,
    seo_description: seoDescription,
  });

  if (error) throw new Error(`Failed to create category: ${error.message}`);

  redirect("/admin/catalog/categories");
}
