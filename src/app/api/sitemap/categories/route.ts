import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poshace.com";

  let categories: { path: string; updated_at: string | null }[] = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("categories")
      .select("path, updated_at")
      .eq("status", "active")
      .order("path");

    categories = data ?? [];
  } catch {
    // empty
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${categories
  .map(
    (c) => `  <url>
    <loc>${siteUrl}/${c.path}.html</loc>
    <lastmod>${c.updated_at ? new Date(c.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
