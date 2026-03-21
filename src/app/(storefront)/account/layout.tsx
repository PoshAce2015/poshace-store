import Link from "next/link";
import { User, Package, MapPin, Heart, RotateCcw } from "lucide-react";

const accountNav = [
  { name: "My Orders", href: "/account/orders", icon: Package },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Returns", href: "/account/returns", icon: RotateCcw },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-6 w-6" />
        <h1 className="text-2xl font-bold">My Account</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <nav className="space-y-1">
          {accountNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
