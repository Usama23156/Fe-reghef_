import { NextResponse } from "next/server";
import { supabase } from "@/api/client";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const { data, error } = await supabase
    .from("carts")
    .select("cart_data")
    .eq("user_id", userId)
    .single();

  if (error) return NextResponse.json({ cart: [] });
  return NextResponse.json({ cart: data?.cart_data || [] });
}
