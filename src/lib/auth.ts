"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCustomer() {
  const user = await getUser();
  if (!user) return null;

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  return data;
}

export async function signUpWithEmail(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const phone = formData.get("phone") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, phone },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Create customer record
  if (data.user) {
    const admin = createAdminClient();
    await admin.from("customers").insert({
      auth_user_id: data.user.id,
      email,
      phone,
      first_name: firstName,
      last_name: lastName,
    });

    // Merge guest cart if exists
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;
    if (sessionId) {
      const { data: customer } = await admin
        .from("customers")
        .select("id")
        .eq("auth_user_id", data.user.id)
        .single();

      if (customer) {
        await admin
          .from("carts")
          .update({ customer_id: customer.id, session_id: null })
          .eq("session_id", sessionId)
          .eq("status", "active");

        cookieStore.delete("cart_session");
      }
    }
  }

  redirect("/account/orders");
}

export async function signInWithEmail(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Merge guest cart
  const user = await getUser();
  if (user) {
    const admin = createAdminClient();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session")?.value;

    if (sessionId) {
      const { data: customer } = await admin
        .from("customers")
        .select("id")
        .eq("auth_user_id", user.id)
        .single();

      if (customer) {
        await admin
          .from("carts")
          .update({ customer_id: customer.id, session_id: null })
          .eq("session_id", sessionId)
          .eq("status", "active");

        cookieStore.delete("cart_session");
      }
    }
  }

  redirect("/account/orders");
}

export async function signInWithOTP(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/login?message=${encodeURIComponent("Check your email for the login link")}`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
