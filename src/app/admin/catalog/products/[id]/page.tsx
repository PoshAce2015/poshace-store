import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getProductById, getBrands, getCategories } from "@/lib/supabase/queries";
import { saveProductAction } from "./actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditorPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  let product: any = null;
  let brands: any[] = [];
  let categories: any[] = [];

  try {
    brands = await getBrands();
    categories = await getCategories();
    if (!isNew) {
      product = await getProductById(id);
      if (!product) notFound();
    }
  } catch {
    if (!isNew) notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/catalog/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {isNew ? "New Product" : "Edit Product"}
          </h1>
          {product && (
            <p className="text-sm text-muted-foreground">{product.slug}</p>
          )}
        </div>
        {product && (
          <div className="ml-auto flex gap-2">
            <Badge>{product.status}</Badge>
            <Badge variant="outline">{product.publish_status}</Badge>
          </div>
        )}
      </div>

      <form action={saveProductAction}>
        <input type="hidden" name="id" value={product?.id ?? ""} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={product?.title ?? ""}
                    placeholder="Enter product title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    defaultValue={product?.slug ?? ""}
                    placeholder="product-url-slug"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    name="short_description"
                    defaultValue={product?.short_description ?? ""}
                    placeholder="Brief product summary for search results"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={product?.description ?? ""}
                    placeholder="Detailed product description (supports HTML)"
                    rows={8}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Variant / Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing & Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="sku"
                      defaultValue={product?.variants?.[0]?.sku ?? ""}
                      placeholder="SKU-001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (INR)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={product?.variants?.[0]?.price ?? ""}
                      placeholder="999.00"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="compare_at_price">Compare at Price (MRP)</Label>
                    <Input
                      id="compare_at_price"
                      name="compare_at_price"
                      type="number"
                      step="0.01"
                      defaultValue={product?.variants?.[0]?.compare_at_price ?? ""}
                      placeholder="1299.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inventory_quantity">Stock Quantity</Label>
                    <Input
                      id="inventory_quantity"
                      name="inventory_quantity"
                      type="number"
                      defaultValue={product?.variants?.[0]?.inventory_quantity ?? "0"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight_grams">Weight (grams)</Label>
                    <Input
                      id="weight_grams"
                      name="weight_grams"
                      type="number"
                      defaultValue={product?.variants?.[0]?.weight_grams ?? ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      name="barcode"
                      defaultValue={product?.variants?.[0]?.barcode ?? ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identifiers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Identifiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="asin">ASIN</Label>
                    <Input
                      id="asin"
                      name="asin"
                      defaultValue={
                        product?.identifiers?.find(
                          (i: any) => i.identifier_type === "asin"
                        )?.identifier_value ?? ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gtin">GTIN / EAN / UPC</Label>
                    <Input
                      id="gtin"
                      name="gtin"
                      defaultValue={
                        product?.identifiers?.find(
                          (i: any) =>
                            i.identifier_type === "gtin" ||
                            i.identifier_type === "ean" ||
                            i.identifier_type === "upc"
                        )?.identifier_value ?? ""
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mpn">MPN</Label>
                    <Input
                      id="mpn"
                      name="mpn"
                      defaultValue={
                        product?.identifiers?.find(
                          (i: any) => i.identifier_type === "mpn"
                        )?.identifier_value ?? ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      defaultValue={
                        product?.identifiers?.find(
                          (i: any) => i.identifier_type === "isbn"
                        )?.identifier_value ?? ""
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    defaultValue={product?.meta_title ?? ""}
                    placeholder="SEO title (auto-generated if empty)"
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    defaultValue={product?.meta_description ?? ""}
                    placeholder="SEO description (auto-generated if empty)"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Product Status</Label>
                  <Select name="status" defaultValue={product?.status ?? "draft"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Publish Status</Label>
                  <Select
                    name="publish_status"
                    defaultValue={product?.publish_status ?? "unpublished"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpublished">Unpublished</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="suppressed">Suppressed</SelectItem>
                      <SelectItem value="pending_review">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Brand</Label>
                  <Select name="brand_id" defaultValue={product?.brand_id ?? ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Product Type</Label>
                  <Select
                    name="product_type"
                    defaultValue={product?.product_type ?? "simple"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="configurable">Configurable</SelectItem>
                      <SelectItem value="bundle">Bundle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Primary Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="primary_image_url">Image URL</Label>
                  <Input
                    id="primary_image_url"
                    name="primary_image_url"
                    defaultValue={product?.primary_image_url ?? ""}
                    placeholder="https://..."
                  />
                </div>
                {product?.primary_image_url && (
                  <div className="mt-3 aspect-square bg-muted rounded overflow-hidden">
                    <img
                      src={product.primary_image_url}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                {isNew ? "Create Product" : "Save Changes"}
              </Button>
              <Link href="/admin/catalog/products">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
