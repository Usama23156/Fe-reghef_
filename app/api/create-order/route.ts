import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    const body: CreateOrderBody = await req.json();

    const { data, error } = await supabase
      .from("orders")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
