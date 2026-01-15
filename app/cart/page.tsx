"use client"
import CartItem from "@/_component/CartItem/page";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import type { RootState} from "@/store/store";

const Page = () => {
  const items = useSelector((state : any) => state.cart.products);

   const categories = useSelector((state: RootState) => state.categories.data);
  const firstCategoryId = categories?.[0]?.id;

  const totalPrice = useMemo(() => {
    let totalNumbers = 0;
    items.forEach((object : any) => {
      totalNumbers += object.totalPrice;
    });
    return totalNumbers;
  }, [items]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {items.length < 1 ? (
        <div className="py-40 text-mainColor text-center h-[85vh]">
          <h1 className="text-2xl sm:text-3xl text-black mb-8">الكارت فاضي </h1>
          <Link
                href={firstCategoryId ? `/menu/${firstCategoryId}` : "/menu"}
                className="bg-(--bg-color) text-white py-2 text-center hover:bg-red-800 transition-all duration-200 rounded-3xl px-3 cursor-pointer"
              >
                ابدا الطلب
              </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 space-y-4 mt-28 mb-10 min-h-[70vh]">
          {items?.map((item : any) => (
            <CartItem key={item.product.id} data={item} />
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="text-lg sm:text-2xl font-medium">
                المجموع:
              </div>
              <div className="text-lg sm:text-2xl text-mainColor font-semibold">
                 {totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/checkout"
className="bg-(--bg-color) text-white py-2 text-center hover:bg-red-800 transition-all duration-200 rounded-3xl px-3 cursor-pointer"              >
               تاكيد الطلب
              </Link>
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
