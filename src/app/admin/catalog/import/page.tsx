import { Upload, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadImportAction } from "./actions";

export default async function ImportPage() {
  let batches: any[] = [];

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("import_batches")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    batches = data ?? [];
  } catch {
    // empty
  }

  const statusIcon: Record<string, any> = {
    uploaded: Clock,
    processing: Clock,
    completed: CheckCircle,
    failed: XCircle,
  };

  const statusColor: Record<string, string> = {
    uploaded: "secondary",
    validating: "secondary",
    validated: "outline",
    processing: "outline",
    enriching: "outline",
    scoring: "outline",
    review: "outline",
    publishing: "outline",
    completed: "default",
    failed: "destructive",
    cancelled: "secondary",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Import Products</h1>
          <p className="text-sm text-muted-foreground">
            Upload CSV files from Scan Unlimited or supplier exports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Upload className="h-4 w-4" />
                New Import
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={uploadImportAction} className="space-y-4">
                <div>
                  <Label>Source</Label>
                  <Select name="source" defaultValue="scan_unlimited">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scan_unlimited">Scan Unlimited</SelectItem>
                      <SelectItem value="supplier_csv">Supplier CSV</SelectItem>
                      <SelectItem value="manual">Manual Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file">CSV File</Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept=".csv,.tsv,.xlsx"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    CSV with headers. Required columns: title, price. Optional: ASIN, UPC, brand, category, image_url, description.
                  </p>
                </div>
                <div>
                  <Label>Column Mapping Template</Label>
                  <Select name="template">
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-detect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="scan_unlimited_v1">Scan Unlimited Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload & Process
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Pipeline stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total batches</span>
                <span className="font-medium">{batches.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Products imported today</span>
                <span className="font-medium">
                  {batches
                    .filter(
                      (b) =>
                        new Date(b.created_at).toDateString() ===
                        new Date().toDateString()
                    )
                    .reduce((sum, b) => sum + (b.success_rows || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto-published</span>
                <span className="font-medium">
                  {batches.reduce((sum, b) => sum + (b.auto_published || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sent to review</span>
                <span className="font-medium">
                  {batches.reduce((sum, b) => sum + (b.sent_to_review || 0), 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Import history */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Import History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Success</TableHead>
                    <TableHead className="text-right">Errors</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.length > 0 ? (
                    batches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="text-sm">{batch.source}</TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {batch.file_name || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={(statusColor[batch.status] as any) ?? "secondary"}>
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {batch.total_rows}
                        </TableCell>
                        <TableCell className="text-right text-sm text-green-600">
                          {batch.success_rows}
                        </TableCell>
                        <TableCell className="text-right text-sm text-red-600">
                          {batch.error_rows}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(batch.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <p className="text-muted-foreground">No imports yet</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Upload a CSV to start importing products.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
