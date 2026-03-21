"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function updateStatusAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;

  const supabase = createAdminClient();
  await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  revalidatePath(`/admin/orders/${orderId}`);
}

export async function addTrackingAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const trackingNumber = formData.get("tracking_number") as string;
  const trackingUrl = formData.get("tracking_url") as string;

  const supabase = createAdminClient();
  await supabase
    .from("orders")
    .update({
      tracking_number: trackingNumber || null,
      tracking_url: trackingUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  revalidatePath(`/admin/orders/${orderId}`);
}
