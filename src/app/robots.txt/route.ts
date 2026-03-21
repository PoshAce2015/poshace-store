export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poshace.com";

  const body = `User-agent: *
Allow: /

# Disallow admin and internal paths
Disallow: /admin/
Disallow: /api/
Disallow: /account/
Disallow: /*/search

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
