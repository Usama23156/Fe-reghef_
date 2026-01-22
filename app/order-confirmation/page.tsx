"use client";
import { useSearchParams } from "next/navigation";


export default function OrderConfirmation() {

    const params = useSearchParams();
const order= params.get("orderNumber") || "غير محدد";

 const parts = order?.split("-") || [];
  const orderDate = parts[1] || "غير محدد";
  const orderCode = parts[2] || "غير محدد";



  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-(--text-color) ">
          تم تأكيد الطلب 
        </h1>
        <p className="text-lg text-(--text-color)">
          سوف يتم توصيل الطلب خلال 30 دقيقه ⏱️
        </p>
        <p className="text-(--text-color)">تاريخ الطلب: { orderDate}</p>
        <p className="text-(--text-color)">رقم الطلب: { orderCode}</p>
      </div>
    </div>
  );
}
