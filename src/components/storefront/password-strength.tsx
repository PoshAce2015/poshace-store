"use client";

import { useState, useEffect } from "react";

interface PasswordStrengthProps {
  password: string;
}

type Strength = "none" | "weak" | "fair" | "strong" | "very-strong";

const strengthConfig: Record<Strength, { label: string; color: string; width: string }> = {
  none: { label: "", color: "bg-muted", width: "w-0" },
  weak: { label: "Weak", color: "bg-red-500", width: "w-1/4" },
  fair: { label: "Fair", color: "bg-yellow-500", width: "w-2/4" },
  strong: { label: "Strong", color: "bg-green-500", width: "w-3/4" },
  "very-strong": { label: "Very Strong", color: "bg-green-600", width: "w-full" },
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = calculateStrength(password);
  const config = strengthConfig[strength];

  if (!password) return null;

  return (
    <div className="mt-1.5 space-y-1">
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${config.color} ${config.width}`}
        />
      </div>
      <p className={`text-xs ${strength === "weak" ? "text-red-500" : strength === "fair" ? "text-yellow-600" : "text-green-600"}`}>
        {config.label}
      </p>
    </div>
  );
}

function calculateStrength(password: string): Strength {
  if (!password) return "none";

  let score = 0;

  // Length checks
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 3) return "fair";
  if (score <= 5) return "strong";
  return "very-strong";
}
