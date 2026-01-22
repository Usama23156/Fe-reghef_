// app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/api/supabaseServer";
import type { CartItem } from "@/store/cartSlice";

// Define the expected body type
interface CreateOrderBody {
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  items: CartItem[]; // ممكن تحدد شكل العناصر بعدين
  total: number;
  delivery_type: "pickup" | "delivery";
  address?: string | null;
  branch?: string | null;
  status: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabaseServer.from("orders").insert([body]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err: unknown) {
  let message = "Unknown error";

  if (err instanceof Error) {
    message = err.message;
  }
  return NextResponse.json({ error: message }, { status: 500 });
}
}