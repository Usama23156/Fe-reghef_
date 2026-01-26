"use client";
import React from "react";
import useTranslation from "@/hooks/useTranslation";

const Page = () => {
   const { t } = useTranslation();
  return (
    <div>
      <div className="About-Us pt-16 pb-10 top-22.25">
        <div className="Main top-[257.5px] gap-13.75">
          <div className="Header">
            <div className="bg-neutral-900">
              <img
                loading="lazy"
                alt=""
                className=" w-full h-96 bg-center bg-cover opacity-50 "
                style={{ backgroundImage: `url(/about1.jpeg)` }}
              />
            </div>
          </div>
          <div className="body md:pr-36.25 md:pl-36.25 pl-8 pr-8 flex flex-col relative pt-10 ">
            <div className=" left-3.75">
              <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435]">
               {t.about1}
              </p>
            </div>

            <div className="  pt-10 md:pl-10">
              <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435]">
               {t.about2}
              </p>
            </div>
          </div>
          <div className=" pt-10">
            <img
              loading="lazy"
              style={{ backgroundImage: `url(/about2.jpeg)` }}
              alt=""
              className="w-full h-96 bg-center bg-cover bg-fixed"
            />
          </div>
          <div className="body md:pr-36.25 md:pl-36.25 pl-8 pr-8 flex flex-col relative ">
            <div className=" max-w-full  pt-15 pr-3.75 pb-10  pl-3.75 lg:pl-10">
              <div className=" pl-10">
                <p className="font-bold text-4xl leading-6 tracking-[-0.1px] align-middle text-[#202435]">
                     {t.about3}
                </p>
              </div>
              <div className=" gap-4 pt-3.75">
                <div>
                  <p className="font-normal text-96  tracking-[0%] align-middle text-[#202435] md:pr-14 ">
                    {t.about4}
                  </p>
                </div>
                <div className="md:pt-1 pt-3">
                  <p className=" font-normal  text-96 tracking-[-0.4px] align-middle text-[#202435] ">
                    {t.about5}
                  </p>
                </div>
              </div>
            </div>
            <div className="left-3.75">
              <p className="font-normal text-96 leading-6 tracking-[0%] align-middle text-[#202435]">
                {t.about6}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
