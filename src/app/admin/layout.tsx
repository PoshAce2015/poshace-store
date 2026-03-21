import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FileText,
  Search,
  Store,
  FolderTree,
  Upload,
  Tag,
  Globe,
  LayoutDashboard,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const sidebarNav = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Catalog",
    items: [
      { name: "Products", href: "/admin/catalog/products", icon: Package },
      { name: "Categories", href: "/admin/catalog/categories", icon: FolderTree },
      { name: "Brands", href: "/admin/catalog/brands", icon: Tag },
      { name: "Attributes", href: "/admin/catalog/attributes", icon: FileText },
      { name: "Import", href: "/admin/catalog/import", icon: Upload },
    ],
  },
  {
    title: "Commerce",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Pricing", href: "/admin/pricing", icon: Tag },
    ],
  },
  {
    title: "Distribution",
    items: [
      { name: "Merchant Center", href: "/admin/merchant", icon: Store },
      { name: "SEO", href: "/admin/seo", icon: Search },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Pages", href: "/admin/cms/pages", icon: FileText },
      { name: "Navigation", href: "/admin/cms/navigation", icon: Globe },
      { name: "Banners", href: "/admin/cms/banners", icon: FileText },
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Roles & Permissions", href: "/admin/settings/roles", icon: Settings },
      { name: "Audit Log", href: "/admin/settings/audit-log", icon: FileText },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Link href="/admin" className="font-bold text-lg">
            Posh<span className="text-primary">ace</span>
            <span className="text-xs text-muted-foreground ml-2">Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="px-2">
            {sidebarNav.map((section, i) => (
              <div key={section.title}>
                {i > 0 && <Separator className="my-2" />}
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </p>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
            &larr; View Storefront
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center px-6 flex-shrink-0">
          <h2 className="font-semibold text-sm">Poshace Admin</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
