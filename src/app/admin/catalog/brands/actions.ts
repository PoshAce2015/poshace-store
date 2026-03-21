"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createBrandAction(formData: FormData) {
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = (formData.get("description") as string) || null;

  const { error } = await supabase.from("brands").insert({
    name,
    slug,
    description,
  });

  if (error) throw new Error(`Failed to create brand: ${error.message}`);

  redirect("/admin/catalog/brands");
}
