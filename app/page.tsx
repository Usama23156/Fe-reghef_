"use client";

import Hero from "@/_component/Hero/page";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchCategories } from "@/store/categorySlice";
import type { RootState, AppDispatch } from "@/store/store";
import Loading from "@/_component/loading/page";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import useTranslation from "@/hooks/useTranslation";

export const dynamic = "force-dynamic";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { data: categories =[], loading } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };
    initAOS();
  }, []);

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        <Loading />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
  return <div>No categories available.</div>;
}
  return (
    <>
      <div className="overflow-hidden">
        <Hero />

        <h2
          className="text-4xl sm:text-5xl font-bold text-center text-(--bg-color) p-10"
          data-aos="flip-down"
        >
          {t.cote} 
        </h2>
        <div className="flex justify-between py-5" dir="rtl">
          <div className="w-[35%] flex flex-col items-center justify-center gap-y-4">
            <p className="text-4xl sm:text-5xl font-bold text-center text-(--text-color)" data-aos="fade-left">
             {t["home-cote"]}
            </p>
            {/* <Link href="menu"  className="text-4xl sm:text-5xl font-bold text-center text-(--text-color)">المنيو </Link> */}
          </div>
          <div className="w-[65%] grid grid-cols-2 bg-(--bg-color)  rounded-r-3xl">
            {categories.length > 0 && categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/menu?category=${category.id}`}
                  className="rounded-lg p-4 text-center  "
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name_en}
                      className="mx-auto mb-2 h-24 object-contain"
                    />
                  )}
                  <p className=" text-(--main-color) text-xl  font-bold">
                    {lang === "ar" ? category.name_ar : category.name_en}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="py-15 md:flex justify-center items-center px-4 gap-x-15 mt-10" dir="rtl">
          <div>
            <img
              src="/about1.jpeg"
              alt=""
              className="md:w-49 w-full rounded-2xl mb-5 max-h-64"
            />
          </div>
          <div className="max-w-2xl" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
            <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435] ">
             {t.about1}
            </p>
            <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435] mt-10">
             {t.about2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
