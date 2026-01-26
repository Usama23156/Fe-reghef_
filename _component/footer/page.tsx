"use client";
import Link from 'next/link';
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import useTranslation from "@/hooks/useTranslation";

 const page = () => {

    const { t } = useTranslation();
  
  return (
    <div className='bg-(--bg-color) w-full'>
    <div className="flex items-center justify-between max-w-full mx-auto px-6 py-3  lg:px-16 ">
        <Link href="/" className="text-[1.1rem] font-semibold text-(--bg-color) flex items-center gap-x-2">
      <img src="/logo.jpg" alt="" className=' max-w-25 rounded-xl'/>
      </Link>
      <div>
        <div className='flex items-center justify-between'>
        <h5 className='text-(--main-color) font-bold text-xl'>{t.فروعنا}</h5>
         <FaLocationDot />
        </div>
        <p className='text-(--main-color)'>{t.loc1}</p>
        <p className='text-(--main-color)'>{t.loc2} </p>
      </div>
      <div>
        <div className='flex items-center justify-between'>
        <h5 className='text-(--main-color) font-bold text-xl'>{t["تواصل معنا"]}</h5>
        <IoIosCall />
        </div>
        <p className='text-(--main-color)'>01040145657</p>
        <p className='text-(--main-color)'>01040770102</p>
      </div>
      <div className="social-icons md:flex items-center ">
        <Link href="" className='s-i md:w-13.75 md:h-13.75 text-[2rem] text-center leading-13.75 transition-[0.2s] duration-[all] ease-linear rounded-[50%]  flex justify-center pt-2.5'> 
        <svg xmlns="http://www.w3.org/2000/svg" height="27" width="27" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
        </Link>
        <Link href="" className='s-i md:w-13.75 md:h-13.75 text-[2rem] text-center leading-13.75   transition-[0.2s] duration-[all] ease-linear rounded-[50%] flex justify-center pt-2.5'>
        <svg xmlns="http://www.w3.org/2000/svg" height="27" width="27" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
        </Link>
      </div>
    </div>
    </div>
  )
}
export default page