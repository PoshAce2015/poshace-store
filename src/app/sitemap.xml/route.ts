import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poshace.com";

  // Count products and categories to determine sitemap partitioning
  let productCount = 0;
  let categoryCount = 0;

  try {
    const supabase = createAdminClient();
    const [products, categories] = await Promise.all([
      supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("status", "active")
        .eq("publish_status", "published"),
      supabase
        .from("categories")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
    ]);
    productCount = products.count ?? 0;
    categoryCount = categories.count ?? 0;
  } catch {
    // DB not available yet
  }

  const productSitemapCount = Math.max(1, Math.ceil(productCount / 10000));

  const sitemaps = [
    `${siteUrl}/api/sitemap/categories`,
    ...Array.from(
      { length: productSitemapCount },
      (_, i) => `${siteUrl}/api/sitemap/products?page=${i + 1}`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((url) => `  <sitemap><loc>${url}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
