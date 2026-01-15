"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from 'next/link';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const page = () => {

  return (

    <div>
      <div className='pt-16'>
     <div className="relative bg-linear-to-r overflow-hidden">
      <div className="w-screen h-1/2 mx-auto ">
         <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="hero-swiper h-lvh w-screen"
        >
          <SwiperSlide className="relative">
            <div className="absolute inset-0 overflow-hidden ">
              <img
                loading="lazy"
                src="/hero1.jpeg"
                alt="Grocery Products"
                className="w-screen h-full object-cover min-h-full min-w-fit"
              />
            </div>

            <div className="relative z-10 container mx-auto h-full flex items-center py-12 px-12 sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <div className="mb-4 ">
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    عرض حصري
                  </span>
                  <span className="inline-block bg-(--bg-color) text-white text-sm px-3 py-1 rounded-full ml-2">
                    20% خصم
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 ">
                  فقط علي
                  <br />
                  طلبات الاونلاين
                </h1>
                <Link href="/menu">
                <button
                  className="bg-(--bg-color) text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                 اطلب الان
                </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <div className="absolute inset-0 overflow-hidden">
              <img
                loading="lazy"
                src="/hero2.jpeg"
                alt="Grocery Products"
                className="w-full h-full object-cover min-h-full min-w-full"
              />

              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10 container mx-auto h-full flex items-center py-12 px-12 sm:px-12 lg:px-20">
              <div className="max-w-xl">
                <div className="mb-4">
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    عرض حصري
                  </span>
                  <span className="inline-block bg-(--bg-color) text-white text-sm px-3 py-1 rounded-full ml-2">
                    20% خصم
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                 فقط علي
                  <br />
                  طلبات الاونلاين
                </h1>
                <Link href="/menu">
                <button
                  className="bg-(--bg-color) text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                  اطلب الان 
                </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    </div>
    </div>
  )
}

export default page