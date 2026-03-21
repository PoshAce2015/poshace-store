import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCategories } from "@/lib/supabase/queries";
import { createCategoryAction } from "./actions";

export default async function CategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await getCategories();
  } catch {
    // empty
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category list */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead className="text-right">Products</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell>
                          <span style={{ paddingLeft: `${cat.depth * 20}px` }}>
                            {cat.depth > 0 && "└ "}
                            {cat.name}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {cat.path}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {cat.product_count}
                        </TableCell>
                        <TableCell>
                          <Badge variant={cat.status === "active" ? "default" : "secondary"}>
                            {cat.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <p className="text-muted-foreground">No categories yet</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Add category form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createCategoryAction} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Electronics" required />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" placeholder="electronics" required />
                </div>
                <div>
                  <Label htmlFor="parent_id">Parent Category</Label>
                  <select
                    id="parent_id"
                    name="parent_id"
                    className="w-full rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="">None (top-level)</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {"—".repeat(cat.depth)} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="google_category_id">Google Category ID</Label>
                  <Input
                    id="google_category_id"
                    name="google_category_id"
                    placeholder="166 (Electronics)"
                  />
                </div>
                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Input
                    id="seo_description"
                    name="seo_description"
                    placeholder="Category description for SEO"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Category
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
