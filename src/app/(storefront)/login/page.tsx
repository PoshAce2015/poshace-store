import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInWithEmail, signInWithOTP, signInWithPhoneOTP, signInWithGoogle } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default async function LoginPage(props: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const sp = await props.searchParams;

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
          {/* Error/Message display */}
          {sp.error && (
            <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
              {sp.error}
            </div>
          )}
          {sp.message && (
            <div className="rounded-md bg-primary/10 text-primary text-sm p-3">
              {sp.message}
            </div>
          )}

          {/* Login Tabs matching Magento: OTP + Password */}
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="otp">Login With OTP</TabsTrigger>
              <TabsTrigger value="password">Login With Password</TabsTrigger>
            </TabsList>

            {/* OTP Tab */}
            <TabsContent value="otp" className="space-y-4 mt-4">
              <form action={signInWithPhoneOTP} className="space-y-4">
                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-md border bg-muted text-sm text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  or use email
                </span>
              </div>

              <form action={signInWithOTP} className="space-y-4">
                <div>
                  <Label htmlFor="otp-email">Email</Label>
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
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password" className="space-y-4 mt-4">
              <form action={signInWithEmail} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" name="remember" className="rounded border-input" />
                  <Label htmlFor="remember" className="text-sm font-normal">Remember Me</Label>
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Google OAuth */}
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <form action={signInWithGoogle}>
            <Button type="submit" variant="outline" className="w-full">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create an Account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
