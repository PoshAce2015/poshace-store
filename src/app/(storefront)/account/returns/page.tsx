import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

export default async function ReturnsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Returns</h2>

      <Card>
        <CardContent className="py-16 text-center">
          <RotateCcw className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No returns</p>
          <p className="text-sm text-muted-foreground mt-1">
            Return requests will appear here. You can return any item within 7 days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
