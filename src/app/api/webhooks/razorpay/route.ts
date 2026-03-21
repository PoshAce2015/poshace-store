import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const event = body.event;

  const supabase = createAdminClient();

  switch (event) {
    case "payment.captured": {
      const payment = body.payload.payment.entity;
      const orderId = payment.notes?.order_id;

      if (orderId) {
        await supabase
          .from("orders")
          .update({
            payment_status: "captured",
            payment_reference: payment.id,
            status: "confirmed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderId);
      }
      break;
    }

    case "payment.failed": {
      const payment = body.payload.payment.entity;
      const orderId = payment.notes?.order_id;

      if (orderId) {
        await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderId);
      }
      break;
    }

    case "refund.processed": {
      const refund = body.payload.refund.entity;
      const paymentId = refund.payment_id;

      // Find order by payment reference
      const { data: order } = await supabase
        .from("orders")
        .select("id")
        .eq("payment_reference", paymentId)
        .single();

      if (order) {
        await supabase
          .from("orders")
          .update({
            payment_status: "refunded",
            status: "refunded",
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);
      }
      break;
    }
  }

  return NextResponse.json({ status: "ok" });
}
