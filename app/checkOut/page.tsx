"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { RootState } from "@/store/store";
import CartItem from "@/_component/CartItem/page";

export default function CheckoutPage() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const router = useRouter();

  // redirect لو مش عامل login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="text-center mt-40">جاري التحميل...</p>;
  }

  if (!user) return null;

  // لو الكارت فاضي
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center mt-40">
        <h1 className="text-2xl font-semibold mb-4">الكارت فاضي</h1>
        <button
          onClick={() => router.push("/menu")}
          className="bg-mainColor text-white px-4 py-2 rounded-lg"
        >
          ابدا الطلب
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item: any) => total + item.totalPrice,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-mainColor">
        تأكيد الطلب
      </h1>

      {/* عرض المنتجات */}
      <div className="space-y-4">
        {cartItems.map((item: any) => (
          <CartItem key={item.product.id} data={item} />
        ))}
      </div>

      {/* ملخص الدفع */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
        <div className="text-xl font-semibold">
          المجموع: <span className="text-mainColor">{totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-mainColor text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
          onClick={() => alert("هنا ممكن تربط الدفع أو إنشاء طلب")}
        >
          تأكيد الطلب
        </button>
      </div>
    </div>
  );
}