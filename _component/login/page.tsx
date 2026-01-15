"use client";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

function page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [isVisible, setisVisible] = useState(true);

  useEffect(() => {
    const handelScroll = () => {
      const currentScrollState = window.scrollY;
      if (currentScrollState > scrollPosition && currentScrollState > 50) {
        setisVisible(false);
      } else {
        setisVisible(true);
      }
      setscrollPosition(currentScrollState);
    };
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, [scrollPosition]);
  return (
    <div>
      <div className="relative pt-1">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={` text-xl ${
            scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
          } bg-transparent  rounded cursor-pointer`}
        >
          <FaRegCircleUser />
        </button>

        <div
          className={`
    absolute left-[-55] mt-2 w-40
    bg-(--bg-color) border border-(--text-color)
    shadow-lg rounded z-50 text-center
    transform origin-top
    transition-all duration-300 ease-out
    ${
      dropdownOpen
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
    }
  `}
        >
          <Link
            href="/login"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-70 hover:bg-red-800 text-(--main-color)"
          >
            تسجيل دخول
          </Link>

          <Link
            href="/Signup"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-70 hover:bg-red-800 text-(--main-color)"
          >
            انشاء حساب
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
