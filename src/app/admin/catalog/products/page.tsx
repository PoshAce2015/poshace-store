import Link from "next/link";
import { Plus, Upload, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProducts } from "@/lib/supabase/queries";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");
  const search = params.search;
  const status = params.status;

  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let total = 0;

  try {
    const result = await getProducts({ page, search, status });
    products = result.products;
    total = result.total;
  } catch {
    // DB not configured yet — show empty state
  }

  const statusColor: Record<string, string> = {
    draft: "secondary",
    active: "default",
    inactive: "outline",
    archived: "destructive",
  };

  const publishColor: Record<string, string> = {
    unpublished: "secondary",
    published: "default",
    suppressed: "destructive",
    pending_review: "outline",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">{total} products total</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/catalog/import">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
          </Link>
          <Link href="/admin/catalog/products/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex gap-4">
            <form className="flex-1">
              <Input
                name="search"
                placeholder="Search by title, SKU, ASIN..."
                defaultValue={search}
              />
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Products table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publish</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/catalog/products/${product.id}`}
                        className="font-medium hover:underline"
                      >
                        {product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {product.slug}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.brand?.name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={(statusColor[product.status] as any) ?? "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={(publishColor[product.publish_status] as any) ?? "secondary"}>
                        {product.publish_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {product.variants?.[0]
                        ? `₹${product.variants[0].price}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {product.variants?.[0]?.inventory_quantity ?? 0}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {product.catalog_score ?? 0}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/admin/catalog/products/${product.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>View on site</DropdownMenuItem>
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <p className="text-muted-foreground">No products yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Import a CSV or add products manually to get started.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {total > 25 && (
        <div className="flex justify-center gap-2 mt-4">
          {page > 1 && (
            <Link href={`/admin/catalog/products?page=${page - 1}`}>
              <Button variant="outline" size="sm">Previous</Button>
            </Link>
          )}
          <span className="text-sm text-muted-foreground self-center">
            Page {page} of {Math.ceil(total / 25)}
          </span>
          {page < Math.ceil(total / 25) && (
            <Link href={`/admin/catalog/products?page=${page + 1}`}>
              <Button variant="outline" size="sm">Next</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
