"use client";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { supabase } from "@/api/client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [User, setUser] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(!(currentScroll > scrollPosition && currentScroll > 50));
      setScrollPosition(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // الحصول على الجلسة الأولية
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <div className="relative pt-1">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`text-xl ${scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"} bg-transparent rounded cursor-pointer`}
      >
        <FaRegCircleUser />
      </button>

      <div className={`absolute left-[-55] mt-2 w-44 bg-(--bg-color) border border-(--text-color) shadow-lg rounded z-50 text-center transition-all duration-200 ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        {!User ? (
          <>
            <Link
              href="/login"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-red-800 text-(--main-color)"
            >
              تسجيل دخول
            </Link>

            <Link
              href="/signUp"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-red-800 text-(--main-color)"
            >
              إنشاء حساب
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/orders"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-red-800 text-(--main-color)"
            >
              طلباتي السابقة
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 hover:bg-red-800 text-(--main-color) cursor-pointer"
            >
              تسجيل خروج
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserMenu;