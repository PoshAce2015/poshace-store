import type { Metadata } from "next";
import { Users, DollarSign, BarChart3, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Affiliate Program - Earn with Poshace",
  description: "Join the Poshace affiliate program. Earn commissions by promoting 145,000+ global products to your audience.",
};

const affiliateTypes = [
  "Blogger",
  "Marketing Agency",
  "Forum Master",
  "Ecommerce Enthusiast",
];

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Commissions",
    description: "Earn generous commissions on every sale you refer",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor your referrals, clicks, and earnings in real time",
  },
  {
    icon: Globe,
    title: "145,000+ Products",
    description: "Promote from our vast catalog of authentic imported products",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Get personalized support from our affiliate team",
  },
];

export default function AffiliatesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Affiliate Program</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Partner with Poshace and earn commissions by sharing our curated global products with your audience.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {benefits.map((b) => (
          <Card key={b.title} className="text-center">
            <CardContent className="pt-6">
              <b.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">{b.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{b.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Form */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-6">Apply to Join</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website / Blog URL</Label>
                <Input id="website" name="website" type="url" placeholder="https://" />
              </div>
              <div>
                <Label htmlFor="type">Affiliate Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your type" />
                  </SelectTrigger>
                  <SelectContent>
                    {affiliateTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Tell us about yourself and your audience</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe your platform, audience size, and how you plan to promote Poshace products..."
              />
            </div>
            <Button type="submit" size="lg">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
