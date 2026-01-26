"use client";
import { useSearchParams } from "next/navigation";


export default function OrderConfirmation() {

    const params = useSearchParams();
const order= params.get("orderNumber") || "غير محدد";



  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          تم تأكيد الطلب ✅
        </h1>
        <p className="text-lg">
          سوف يتم توصيل الطلب خلال ساعة ⏱️
        </p>
        <p>رقم الطلب: {order}</p>
      </div>
    </div>
  );
}
