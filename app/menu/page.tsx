import { Suspense } from "react";
import MenuClient from "@/app/menu/menuClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <MenuClient />
   </Suspense>
  );
}