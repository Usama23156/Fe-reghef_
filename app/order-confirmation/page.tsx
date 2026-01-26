"use client";

import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

export default function OrderConfirmation() {
  const { t, lang } = useTranslation();
  const params = useSearchParams();
  const order = params.get("orderNumber") || "غير محدد";

  return (
    <div className="flex items-center justify-center min-h-screen text-center px-4">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-(--text-color)">
          {t.orderDone}
        </h1>
       
        <p className="text-(--text-color)">
          {t.orderNum} {order}
        </p>
      </div>
    </div>
  );
}
