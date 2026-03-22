"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  deadline: Date;
  label?: string;
}

export function CountdownTimer({ deadline, label = "Deal ends in:" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeLeft(deadline);
      setTimeLeft(remaining);
      if (remaining.total <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft.total <= 0) {
    return (
      <p className="text-sm text-muted-foreground">This deal has expired</p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex gap-1.5">
        <TimeUnit value={timeLeft.days} unit="d" />
        <span className="text-lg font-mono font-bold text-muted-foreground">:</span>
        <TimeUnit value={timeLeft.hours} unit="h" />
        <span className="text-lg font-mono font-bold text-muted-foreground">:</span>
        <TimeUnit value={timeLeft.minutes} unit="m" />
        <span className="text-lg font-mono font-bold text-muted-foreground">:</span>
        <TimeUnit value={timeLeft.seconds} unit="s" />
      </div>
    </div>
  );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-mono font-bold tabular-nums bg-primary/10 rounded px-2 py-0.5">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-muted-foreground mt-0.5">{unit}</span>
    </div>
  );
}

function getTimeLeft(deadline: Date) {
  const total = deadline.getTime() - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
