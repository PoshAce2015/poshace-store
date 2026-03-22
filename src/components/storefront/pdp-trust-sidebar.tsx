import { Truck, RotateCcw, DollarSign, Banknote, Shield, Headphones } from "lucide-react";

const trustBadges = [
  { icon: Truck, title: "Free International Shipping", description: "On all orders" },
  { icon: RotateCcw, title: "Free International Returns", description: "Within 7 days" },
  { icon: DollarSign, title: "Lowest Price Guaranteed", description: "We match competitors" },
  { icon: Banknote, title: "International COD", description: "On select orders" },
  { icon: Shield, title: "1 Year Warranty", description: "Manufacturer warranty" },
  { icon: Headphones, title: "Priority Support", description: "24/7 customer care" },
];

export function PdpTrustSidebar() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-xl animate-border-glow" />
      <div className="relative bg-zinc-950 rounded-xl m-[2px] p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Why Buy From Poshace</h3>
        <div className="space-y-3">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{badge.title}</p>
                <p className="text-zinc-400 text-xs">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes border-glow {
          0% { background: conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6); }
          100% { background: conic-gradient(from 360deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6); }
        }
        .animate-border-glow {
          animation: border-glow 3s linear infinite;
          background: conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6);
        }
      `}</style>
    </div>
  );
}
