import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default async function AddressesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Saved Addresses</h2>
        <Button size="sm">Add Address</Button>
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No saved addresses</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add an address for faster checkout.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
