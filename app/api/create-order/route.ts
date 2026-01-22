import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/api/supabaseServer";


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);

type OrderItem = {
  product: {
    id: string;
    name: string;
  };
  count: number;
  totalPrice: number;
  details?: Record<string, string>;
};

type CreateOrderBody = {
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total: number;
  delivery_type: "pickup" | "delivery";
  address: string | null;
  branch: string | null;
  status: "pending" | "completed" | "cancelled";
};
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabaseServer
      .from("orders")
      .insert([body])
      .select(); // لترجيع بيانات الطلب بعد الإنشاء

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]); // نرجع أول عنصر
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}