"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/authSlice";
import { setCart } from "@/store/cartSlice";
import { supabase } from "@/api/client";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      const { data } = await supabase.auth.getUser();
      if (!data.user) throw new Error("فشل تسجيل الدخول");

      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
        })
      );

      if (isClient) {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
          dispatch(setCart(localCart));
          await fetch("/api/save-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data.user.id,
              cart: localCart,
            }),
          });
          localStorage.removeItem("cart");
        }
      }

      router.push("/");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-(--bg-color)">
        <h2 className="text-2xl font-bold text-center text-(--text-color) mb-6">
          تسجيل الدخول
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
          <label htmlFor="email" className="text-(--text-color)">الإيميل</label>
          <input
            placeholder="الإيميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-(--text-color)"> كلمة السر</label>
          <input
            type="password"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
        </div>
        </div>

        <button onClick={handleLogin} className="btn-main mt-6 bg-(--bg-color) p-2 rounded-2xl w-full cursor-pointer">
          دخول
        </button>

        <p className="text-center text-sm mt-4 text-(--text-color)">
          ليس لديك حساب؟{" "}
          <a href="/signUp" className="text-(--bg-color) cursor-pointer">
            سجل الآن
          </a>
        </p>
      </div>
    </div>
  );
}
