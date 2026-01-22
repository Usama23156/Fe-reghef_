import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // مهم
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: body.order_number,
        user_id: body.user_id || null, // ضيف أو لوجين
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        items: body.items,
        total: body.total,
        delivery_type: body.delivery_type,
        address: body.address,
        branch: body.branch,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
