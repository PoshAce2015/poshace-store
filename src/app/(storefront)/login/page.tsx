import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signInWithEmail, signInWithOTP } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your Poshace account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email/Password Login */}
          <form action={signInWithEmail} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          {/* OTP Login */}
          <form action={signInWithOTP} className="space-y-4">
            <div>
              <Label htmlFor="otp-email">Email (Passwordless Login)</Label>
              <Input
                id="otp-email"
                name="email"
                type="email"
                placeholder="Get a magic link via email"
                required
              />
            </div>
            <Button type="submit" variant="outline" className="w-full">
              Send Magic Link
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
