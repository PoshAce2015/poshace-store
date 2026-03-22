import type { Metadata } from "next";
import { Shield, Cookie, Eye, Lock, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Policy",
  description: "Poshace privacy policy and cookie usage. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">Privacy Policy &amp; Cookie Policy</h1>
      <p className="text-muted-foreground mt-3">
        At Poshace (operated by Figureout Enterprises), we are committed to protecting your privacy and personal data.
      </p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Eye className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Information We Collect</h2>
                <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-inside text-sm">
                  <li>Name, email address, and contact information</li>
                  <li>Shipping and billing addresses</li>
                  <li>Phone number and postcode</li>
                  <li>Order history and preferences</li>
                  <li>Browsing behavior and interests</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">How We Use Your Data</h2>
                <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-inside text-sm">
                  <li>Processing and fulfilling your orders</li>
                  <li>Improving our services and website</li>
                  <li>Personalizing your shopping experience</li>
                  <li>Sending promotional communications (with your consent)</li>
                  <li>Market research and product development</li>
                  <li>Internal record keeping</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Data Security</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  We implement physical, electronic, and managerial procedures to safeguard your information. All payment transactions are processed through secure, PCI-compliant payment gateways. We never store raw credit card data on our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold text-lg">Cookies We Use</h2>
                <div className="mt-2 space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Essential Cookies</p>
                    <p className="text-muted-foreground">Session management, CSRF protection, and shopping cart persistence. These are required for the site to function.</p>
                  </div>
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-muted-foreground">Google Analytics and Google Tag Manager help us understand how visitors use our site so we can improve it.</p>
                  </div>
                  <div>
                    <p className="font-medium">Marketing Cookies</p>
                    <p className="text-muted-foreground">Used for advertising and remarketing through Google Ads. You can opt out via your browser settings.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-semibold text-lg">Third-Party Services</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            We use the following third-party services that may collect data:
          </p>
          <ul className="text-muted-foreground mt-2 space-y-1 list-disc list-inside text-sm">
            <li>Google Tag Manager &amp; Google Analytics — website analytics</li>
            <li>Razorpay — secure payment processing</li>
            <li>Supabase — authentication and data storage</li>
            <li>Vercel — website hosting and performance</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Your Rights</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            You have the right to request access to, correction of, or deletion of your personal data. You can also opt out of marketing communications at any time. To exercise these rights, contact us at the address below.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground pt-4 border-t">
          <Mail className="h-4 w-4" />
          <span>Privacy inquiries: support@poshace.com | (033) 6902 8439</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Last updated: March 2026. Figureout Enterprises reserves the right to update this policy.
        </p>
      </div>
    </div>
  );
}
