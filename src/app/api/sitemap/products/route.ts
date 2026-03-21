import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poshace.com";
  const page = parseInt(request.nextUrl.searchParams.get("page") ?? "1");
  const pageSize = 10000;

  let urls: { slug: string; updated_at: string | null }[] = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("status", "active")
      .eq("publish_status", "published")
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    urls = data ?? [];
  } catch {
    // empty
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (p) => `  <url>
    <loc>${siteUrl}/${p.slug}.html</loc>
    <lastmod>${p.updated_at ? new Date(p.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
