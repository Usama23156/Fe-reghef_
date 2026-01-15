"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth/signUp";

export default function RegisterPage() {
  const [form, setForm] = useState({
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
      await signUp({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
      alert("تم إنشاء الحساب بنجاح");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 pt-30 mb-7">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-(--bg-color)">
        <h2 className="text-2xl font-bold text-center text-(--bg-color) mb-6">
          تسجيل حساب جديد
        </h2>

        <div className="space-y-4">
            <div>
                <h4 className="text-80 text-(--text-color)"> الاسم</h4>
          <input
            name="name"
            placeholder="الاسم"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color)"
            />
            </div>
            <div>
                <h4 className="text-80 text-(--text-color)"> رقم الموبايل</h4>
          <input
            name="phone"
            placeholder="رقم الموبايل"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color)"
          />
            </div>
            <div>
                <h4 className="text-80 text-(--text-color)">الإيميل</h4>
          <input
            name="email"
            placeholder="الإيميل"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color)"
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
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color)"
            />
            </div>
            <div>
                 <h4 className="text-80 text-(--text-color)">اعاده كلمه السر</h4>
          <input
            type="password"
            name="rePassword"
            placeholder="إعادة كلمة السر"
            value={form.rePassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--text-color) border-(--bg-color) placeholder-shown:text-(--text-color)"
            />
            </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors"
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