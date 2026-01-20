"use client";

import { useState, useEffect } from "react";
import { signUp } from "@/lib/auth/signUp";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import { saveCartToUser, setCart } from "@/store/cartSlice";
import { supabase } from "@/api/client";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => setIsClient(true), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (form.password !== form.rePassword) {
      alert("كلمة السر غير متطابقة");
      return;
    }

    try {
      await signUp({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });

      // 🔹 جلب بيانات المستخدم بشكل صحيح حسب Supabase SDK
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user; // ✅ هنا الفرق
      if (!user) throw new Error("User not found after signup");

      dispatch(setUser({ id: user.id, email: user.email || "" }));

      if (isClient) {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
          dispatch(setCart(localCart));
          await fetch("/api/save-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, cart: localCart }),
          });
          localStorage.removeItem("cart");
        }
      }

      router.push("/checkout");
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء التسجيل");
    }
  };

  if (!isClient) return null;

  const fields = [
    { name: "name", label: "الاسم" },
    { name: "phone", label: "رقم الموبايل" },
    { name: "email", label: "الإيميل" },
    { name: "password", label: "كلمة السر" },
    { name: "rePassword", label: "إعادة كلمة السر" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-30 mb-7">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-(--bg-color)">
        <h2 className="text-2xl font-bold text-center text-(--bg-color) mb-6">
          تسجيل حساب جديد
        </h2>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <h4 className="text-80 text-(--text-color)">{field.label}</h4>
              <input
                type={field.name.includes("password") ? "password" : "text"}
                name={field.name}
                placeholder={field.label}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color) text-(--text-color)"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors cursor-pointer"
        >
          تسجيل حساب
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          لديك حساب؟{" "}
          <a href="/login" className="text-(--bg-color) hover:underline">
            سجل دخول
          </a>
        </p>
      </div>
    </div>
  );
}
