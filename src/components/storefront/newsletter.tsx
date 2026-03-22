"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Save to newsletter_subscribers table or send to email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
        <p className="font-medium text-sm">Thank you for subscribing!</p>
        <p className="text-xs text-muted-foreground mt-1">
          You&apos;ll receive the best deals and product updates.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="font-semibold text-sm mb-1">Stay Updated</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Get exclusive deals and new product alerts
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-sm"
        />
        <Button type="submit" size="sm">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
