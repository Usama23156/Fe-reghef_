"use client";

import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";

export default function OrderConfirmation() {
   const { t } = useTranslation();
    const params = useSearchParams();
const order= params.get("orderNumber") || "غير محدد";



  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">
         {t.orderDone}
        </h1>
        <p className="text-lg">
         {t.time}
        </p>
        <p>{t.orderNum} : {order}</p>
      </div>
    </div>
  );
}
