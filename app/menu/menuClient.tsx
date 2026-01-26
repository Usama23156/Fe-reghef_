"use client";
import React, { useState, useMemo, useEffect } from "react";
import ProductPopp from "@/_component/productPopp/page";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import { fetchCategories } from "@/store/categorySlice";
import type { RootState, AppDispatch } from "@/store/store";
import { useSearchParams } from "next/navigation";
import Loading from "@/_component/loading/page";
import { Category } from "@/types/category";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  price: number;
  image: string;
  category_id: string;
}

export const dynamic = "force-dynamic";

 const Page = () => {
const { t } = useTranslation();
const lang = useSelector((state: RootState) => state.language.lang);
const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
     const searchParams = useSearchParams();
const categoryFromUrl = searchParams.get("category");
  const dispatch = useDispatch<AppDispatch>();
 const router = useRouter();

  const { data: categories } = useSelector(
    (state: RootState) => state.categories
  );

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
 
  const activeCategoryId = useMemo(() => {
  if (searchParams.get("category")) {
    return searchParams.get("category");
  }

  if (categories?.length) {
    return categories[0].id.toString();
  }

  return null;
}, [searchParams, categories]);



  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);




  const openModal = (item: Product) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const activeItems = useMemo(() => {
    if (!products || !activeCategoryId) return [];

    return products.filter(
      (item) => item.category_id.toString() === activeCategoryId
    );
  }, [products, activeCategoryId]);

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        <Loading />
      </div>
    );
  }



  return (
    <div>
      <div className="pt-16">
        <div
          className=" w-full min-h-screen bg-center bg-cover relative"
          style={{ backgroundImage: `url(/box9.jpeg)` }}
        ></div>
         <div>
      <div className="justify-between items-center transition-[0.5s] px-6 lg:px-25 py-2 md:py-3">
        <div className="flex md:relative left-0 w-full h-auto lg:flex flex-col md:flex-row items-center md:justify-center">
          <div className=" py-4 md:py-7 flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-4 xl:px-37.5">
            <div className="w-full ">
              <ul className="flex flex-row justify-center items-start lg:items-center md:gap-0 mt-5 lg:mt-0  md:pl-0">
                {categories?.map((item: Category) => (
                  <li
                    key={item.id}
                    className="flex justify-center items-center gap-2 uppercase font-semibold text-[#3E445A] text-xl  px-3 py-2 md:py-3 cursor-pointer"
                     onClick={() =>router.replace(`?category=${item.id}`, { scroll: false })}

                  >
                    <div
                      className={`${
                        activeCategoryId === item.id.toString()
                          ? "text-(--bg-color) "
                          : "text-(--text-color) hover:text-(--bg-color)"
                      }`}
                    >
                      {/* {item.name_ar} */}
                      {lang === "ar" ? item.name_ar : item.name_en}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex flex-col mt-10 mb-10 mx-auto">
        <div className="p-10 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-fit mx-auto justify-center">
            {activeItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)} // Open modal on click
                className="p-0 mb-2 flex flex-col justify-center rounded-lg border border-(--bg-color) shadow-lg hover:scale-95 transition-all duration-200 relative overflow-hidden w-full cursor-pointer"
              >
                <div className="pb-0">
                  <div className="aspect-square w-36 h-24 rounded-lg rounded-b-none mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name_en} // Use item.name for better accessibility
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="px-5 pt-0">
                  <h3 className="text-xl font-medium text-black ">
                    {lang === "ar" ? item.name_ar : item.name_en}
                  </h3>
                  <span className="text-[13px] text-black">
                    {item.price} 
                  </span>
                </div>
                <div className="flex justify-center items-center mb-2 mt-2">
                  <button className="bg-(--bg-color) text-white py-1 text-center hover:bg-red-800 transition-all duration-200 rounded-3xl px-3 cursor-pointer">
                    {t.add}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductPopp
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
      </div>
    </div>
  )
}
export default Page