import Link from "next/link";

const footerLinks = {
  shop: [
    { name: "Electronics", href: "/electronics.html" },
    { name: "Computers & Accessories", href: "/computers-and-accessories.html" },
    { name: "Watches", href: "/watches.html" },
    { name: "Home & Kitchen", href: "/home-and-kitchen.html" },
    { name: "Sports & Fitness", href: "/sports-fitness-and-outdoors.html" },
  ],
  help: [
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Returns & Refunds", href: "/return-exchange-promise" },
    { name: "Track Your Order", href: "/account/orders" },
    { name: "Contact Us", href: "/contact-us" },
  ],
  company: [
    { name: "About Poshace", href: "/about-us" },
    { name: "Privacy Policy", href: "/privacy-policy-cookie-restriction-mode" },
    { name: "B2B / Bulk Orders", href: "/about-us#b2b" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      {/* Trust bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-semibold text-sm">No Customs Hassles</p>
              <p className="text-xs text-muted-foreground mt-1">Duties & taxes included</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Guaranteed Authenticity</p>
              <p className="text-xs text-muted-foreground mt-1">100% genuine products</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Direct Sourcing</p>
              <p className="text-xs text-muted-foreground mt-1">Curated global selection</p>
            </div>
            <div>
              <p className="font-semibold text-sm">7-Day Free Returns</p>
              <p className="text-xs text-muted-foreground mt-1">Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Figureout Enterprises</li>
              <li>Phone: (033) 6902 8439</li>
              <li>Email: info@poshace.com</li>
              <li className="pt-2">
                <p className="text-xs">GST invoices available for all orders</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Poshace.com — Figureout Enterprises. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Shop global products like a local
          </p>
        </div>
      </div>
    </footer>
  );
}
