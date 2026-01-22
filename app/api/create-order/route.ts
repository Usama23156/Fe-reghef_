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
    const body: CreateOrderBody = await req.json();

    const { data, error } = await supabaseServer
      .from("orders")
      .insert([body])
      .select(); // نرجع بيانات الطلب بعد الإنشاء

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    let message = "حدث خطأ أثناء تأكيد الطلب";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
