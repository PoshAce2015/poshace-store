import Link from "next/link";
import { Newsletter } from "./newsletter";

const footerLinks = {
  shop: [
    { name: "Electronics", href: "/electronics.html" },
    { name: "Computers & Accessories", href: "/computers-and-accessories.html" },
    { name: "Watches", href: "/watches.html" },
    { name: "Home & Kitchen", href: "/home-and-kitchen.html" },
    { name: "Sports & Fitness", href: "/sports-fitness-and-outdoors.html" },
    { name: "Musical Instruments", href: "/musical-instruments.html" },
    { name: "Video Games", href: "/video-games.html" },
  ],
  help: [
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Returns & Refunds", href: "/return-exchange-promise" },
    { name: "Return & Refund Policy", href: "/return-refund-policy" },
    { name: "Price Match Guarantee", href: "/price-match-guarantee" },
    { name: "Track Your Order", href: "/account/orders" },
    { name: "Contact Us", href: "/contact-us" },
  ],
  company: [
    { name: "About Poshace", href: "/about-us" },
    { name: "B2B / Bulk Orders", href: "/about-us#b2b" },
    { name: "Affiliates", href: "/affiliates" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
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
            {/* Social media */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/poshace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/poshace_official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Company description */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground max-w-3xl">
            Poshace.com connects businesses and individual customers in India with top-quality global products.
            Co-founded by Ujjwal and Abhishek Kumar, our platform offers a seamless experience for sourcing
            international goods, catering to both B2B and B2C needs.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t py-8">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 - {new Date().getFullYear()} Figureout Enterprises. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Shop global products like a local
          </p>
        </div>
      </div>
    </footer>
  );
}
