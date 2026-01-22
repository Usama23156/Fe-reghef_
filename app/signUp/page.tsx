"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/authSlice";
import { setCart } from "@/store/cartSlice";
import { supabase } from "@/api/client";

interface FormFields {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.rePassword) {
      alert("كلمة السر غير متطابقة");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw new Error(error.message);

      const { data } = await supabase.auth.getUser();
      if (!data.user) throw new Error("لم يتم العثور على المستخدم");

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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-(--bg-color) my-8">
        <h2 className="text-2xl font-bold text-center text-(--text-color) mb-6">
          تسجيل حساب جديد
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
          <label htmlFor="name" className="text-(--text-color)">الاسم</label>
          <input
            name="name"
            placeholder="الاسم"
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
            />
            </div>
            <div className="flex flex-col">
          <label htmlFor="phone" className="text-(--text-color)">رقم الموبايل</label>
          <input
            name="phone"
            placeholder="رقم الموبايل"
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="email" className="text-(--text-color)">الإيميل</label>
          <input
            name="email"
            placeholder="الإيميل"
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="password" className="text-(--text-color)"> كلمة السر</label>
          <input
            type="password"
            name="password"
            placeholder="كلمة السر"
            onChange={handleChange}
            className="input input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />  
          </div>
          <div className="flex flex-col">
          <label htmlFor="rePassword" className="text-(--text-color)">إعادة كلمة السر</label>
          <input
            type="password"
            name="rePassword"
            placeholder="إعادة كلمة السر"
            onChange={handleChange}
            className="input input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
        </div>

        <button onClick={handleSubmit} className="btn-main mt-6 bg-(--bg-color) p-2 rounded-2xl w-full cursor-pointer">
          تسجيل حساب
        </button>

        <p className="text-center text-sm mt-4 text-(--text-color)">
          لديك حساب؟{" "}
          <a href="/login" className="text-(--bg-color) cursor-pointer">
            سجل دخول
          </a>
        </p>
      </div>
    </div>
  );
}
