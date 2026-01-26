"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/authSlice";
import { setCart } from "@/store/cartSlice";
import { supabase } from "@/api/client";
import useTranslation from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
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
            {t.signupTitle}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
          <label htmlFor="name" className="text-(--text-color)">{t.الاسم}</label>
          <input
            name="name"
            placeholder={t.الاسم}
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
            />
            </div>
            <div className="flex flex-col">
          <label htmlFor="phone" className="text-(--text-color)"> {t.الموبايل}</label>
          <input
            name="phone"
            placeholder={t.الموبايل}
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="email" className="text-(--text-color)"> {t.الاميل} </label>
          <input
            name="email"
            placeholder={t.الاميل}
            onChange={handleChange}
            className="input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="password" className="text-(--text-color)"> {t.password}</label>
          <input
            type="password"
            name="password"
            placeholder={t.password}
            onChange={handleChange}
            className="input input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />  
          </div>
          <div className="flex flex-col">
          <label htmlFor="rePassword" className="text-(--text-color)"> {t.repassword} </label>
          <input
            type="password"
            name="rePassword"
            placeholder={t.repassword}
            onChange={handleChange}
            className="input input text-(--text-color) border border-(--bg-color) px-3 bg-gray-100 p-1 rounded-xl"
          />
          </div>
        </div>

        <button onClick={handleSubmit} className="btn-main mt-6 bg-(--bg-color) p-2 rounded-2xl w-full cursor-pointer">
           {t.supmit}
        </button>

        <p className="text-center text-sm mt-4 text-(--text-color)">
         {t["signup-cote"]}
          <a  onClick={() => router.push("/login")} className="text-(--bg-color) cursor-pointer">
             {t.login}
          </a>
        </p>
      </div>
    </div>
  );
}
