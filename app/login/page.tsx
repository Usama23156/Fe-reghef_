"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { saveCartToUser, setCart } from "@/store/cartSlice";
import { supabase } from "@/api/client";
import type { AppDispatch } from "@/store/store";


export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const handleLogin = async () => {
    try {
      // 1️⃣ تسجيل الدخول
      const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (loginError) throw loginError;

      const user = sessionData.user;
      if (!user) throw new Error("User not found");

      // 2️⃣ تحديث Redux auth state
      dispatch(setUser({ id: user.id, email: user.email || "" }));

      // 3️⃣ جلب الكارت من localStorage
      if (typeof window !== "undefined") {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

        // 4️⃣ حفظ الكارت على DB إذا فيه عناصر
        if (localCart.length > 0) {
          await fetch("/api/save-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, cart: localCart }),
          });

          // 5️⃣ تحديث Redux state للكارت
          dispatch(saveCartToUser({ cart: CartItem }));

          // نظف localStorage
          localStorage.removeItem("cart");
        } else {
          // 6️⃣ لو مفيش cart في localStorage، جلب الكارت من DB
          const res = await fetch("/api/get-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
          });
          const dbData = await res.json();
          if (dbData.cart) dispatch(setCart(dbData.cart));
        }
      }

      // 7️⃣ اذهب مباشرة للـ checkout
      router.push("/");
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-30 mb-7">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-(--bg-color)">
        <h2 className="text-2xl font-bold text-center text-(--bg-color) mb-6">
          تسجيل الدخول
        </h2>

        <div className="space-y-4">
          <div>
            <h4 className="text-80 text-(--text-color)">الإيميل</h4>
            <input
              name="email"
              placeholder="الإيميل"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color) text-(--text-color)"
            />
          </div>
          <div>
            <h4 className="text-80 text-(--text-color)">كلمة السر</h4>
            <input
              type="password"
              name="password"
              placeholder="كلمة السر"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color) text-(--text-color)"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors cursor-pointer"
        >
          تسجيل الدخول
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <a href="/register" className="text-(--bg-color) hover:underline">
            سجل الآن
          </a>
        </p>
      </div>
    </div>
  );
}
