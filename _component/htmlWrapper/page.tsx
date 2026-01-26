"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";

export default function HtmlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <>{children}</>;
}
