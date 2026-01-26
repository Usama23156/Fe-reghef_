"use client"; // لازم تكون أول سطر

import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

export default function OrderConfirmation() {
  const { t } = useTranslation();
  const params = useSearchParams(); // client-only
  const order = params.get("orderNumber") || "غير محدد";

  return (
    <div className="flex items-center justify-center min-h-screen text-center px-4">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-(--text-color)">
          {t.orderDone}
        </h1>
        <p className="text-lg mb-2 text-(--text-color)">{t.time}</p>
        <p className="text-(--text-color)">
          {t.orderNum} {order}
        </p>
      </div>
    </div>
  );
}
