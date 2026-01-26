"use client"; 

import { useSearchParams, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

export default function OrderConfirmation() {
  const { t, lang } = useTranslation();
  const params = useSearchParams();
  const router = useRouter();

  // رقم الطلب من الـ URL
  const orderNumber = params.get("orderNumber") || "غير محدد";

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-(--text-color)">
          {t.orderDone}
        </h1>
        <p className="text-lg mb-2 text-(--text-color)">
          {t.time}
        </p>
        <p className="text-(--text-color) mb-6">
          {t.orderNum}: {orderNumber}
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-(--bg-color) text-white rounded-lg hover:bg-red-800 transition cursor-pointer"
        >
          {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home"}
        </button>
      </div>
    </div>
  );
}
