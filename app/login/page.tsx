"use client";
import { useState } from "react";
import { login } from "@/lib/auth/login";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { user } = await login({ email: form.email, password: form.password });
      
      // 1️⃣ تحديث Redux
      dispatch(setUser({ id: user.id, email: user.email }));

      // 2️⃣ redirect مباشرة لـ checkout
      router.push("/checkout");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-(--bg-color) mt-19">
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
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2  border-(--bg-color) placeholder-shown:text-(--text-color) text-(--text-color)"
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
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2  border-(--bg-color) placeholder-shown:text-(--text-color text-(--text-color))"
            />
            </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors cursor-pointer "
        >
          تسجيل الدخول
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <a href="/signUp" className="text-(--bg-color) hover:underline">
            سجل حساب جديد
          </a>
        </p>
      </div>
    </div>
  );
}