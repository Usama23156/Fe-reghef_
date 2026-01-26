"use client";
import React from "react";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { BsEnvelope } from "react-icons/bs";
import useTranslation from "@/hooks/useTranslation";

const Page: React.FC = () => {
  
  const { t } = useTranslation();

  return (
    <div className="pt-32">
      <div className="lg:px-37.5 sm:max-w-[90%] md:max-w-full m-auto text-black">

        {/* ===== Title ===== */}
        <div className="max-lg:px-5">
          <h1 className="font-normal md:text-[40px] text-center text-[30px]">
            {t["تواصل معنا"]}
          </h1>
        </div>

        {/* ===== Info Boxes ===== */}
        <div className="my-7.5 flex flex-wrap gap-7 lg:max-w-[80%] md:max-w-[90%] m-auto">
          <div className="rounded-lg w-full md:w-[30%] py-6 flex flex-col items-center gap-2 bg-[#eee]">
            <FaLocationDot className="text-(--bg-color) text-xl" />
            <p className="text-center">{t.loc1}</p>
            <p className="text-center">{t.loc2}</p>
          </div>

          <div className="rounded-lg w-full md:w-[30%] py-6 flex flex-col items-center gap-2 bg-[#eee]">
            <FaPhoneVolume className="text-(--bg-color) text-xl" />
            <p className="text-center">01040145657</p>
            <p className="text-center">01040770102</p>
          </div>

          <div className="rounded-lg w-full md:w-[30%] py-6 flex flex-col items-center gap-2 bg-[#eee]">
            <BsEnvelope className="text-(--bg-color) text-2xl" />
            <p className="text-center">FeReghef@gmail.com</p>
          </div>
        </div>

        {/* ===== Form Section ===== */}
        <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.1)] md:p-12.5 rounded-2xl my-12.5 md:max-w-[90%] lg:max-w-[80%] max-w-[85%] m-auto">

          <div className="max-lg:px-5">
            <h2 className="font-normal md:text-[32px] text-center text-[24px] text-xl">
              {t["ارسل لنا"]}
            </h2>
            <p className="mb-7.5 text-center m-auto max-w-[60%] max-sm:text-[12px] ">
              {t.contact_desc}
            </p>
          </div>

          {/* ===== Inputs ===== */}
          <div className="px-7.5 md:px-0 pb-12.5 flex flex-wrap gap-5 justify-between">

            <div className="flex flex-col w-full">
              <label className="mb-1">{t.الاسم}</label>
              <input
                type="text"
                className="rounded bg-[#F3F4F7] p-2 outline-none"
              />
            </div>

            <div className="flex flex-col w-full ">
              <label className="mb-1">{t.الاميل}</label>
              <input
                type="email"
                className="rounded bg-[#F3F4F7] p-2 outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-1">{t.الموبايل}</label>
              <input
                type="number"
                className="rounded bg-[#F3F4F7] p-2 outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-1">{t.رسالتك}</label>
              <textarea
                rows={4}
                className="resize-none rounded bg-[#F3F4F7] p-2 outline-none"
              />
            </div>

            <button className="cursor-pointer px-6 py-2 text-white bg-(--bg-color) rounded-[5px]">
              {t.ارسل}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
