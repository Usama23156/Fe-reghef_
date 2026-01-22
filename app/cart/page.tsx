"use client";
import CartItem from "@/_component/CartItem/page";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import type { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const categories = useSelector((state: RootState) => state.categories.data);
  const firstCategoryId = categories?.[0]?.id;

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    router.push("/checkOut");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {cartItems.length < 1 ? (
        <div className="pt-[50%] md:pt-40 text-mainColor text-center h-[85vh] mt-30">
          <h1 className="text-2xl sm:text-3xl text-black mb-8">الكارت فاضي</h1>
          <Link
            href={firstCategoryId ? `/menu/${firstCategoryId}` : "/menu"}
            className="bg-(--bg-color) text-white py-2 text-center hover:bg-red-800 transition-all duration-200 rounded-3xl px-3 cursor-pointer"
          >
            ابدا الطلب
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 space-y-4 mt-28 mb-10 min-h-[70vh]">
          {cartItems.map((item) => (
            <CartItem key={item.product.id + JSON.stringify(item.details)} data={item} />
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="text-lg sm:text-2xl font-medium">المجموع:</div>
              <div className="text-lg sm:text-2xl text-mainColor font-semibold">
                {totalPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="bg-(--bg-color) text-white px-2 py-2 rounded-3xl hover:bg-red-800 cursor-pointer"
            >
              تاكيد الطلب
            </button>
            <Link
              href={firstCategoryId ? `/menu/${firstCategoryId}` : "/menu"}
              className="bg-(--bg-color) text-white py-2 text-center hover:bg-red-800 transition-all duration-200 rounded-3xl px-3 cursor-pointer"
            >
              ارجع للمنيو
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
