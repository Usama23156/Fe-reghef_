"use client";
import React, { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CartIcon from "@/_component/cartIcon/page";
import Login from "@/_component/login/page";
import { useDispatch, useSelector } from "react-redux";
import type { RootState} from "@/store/store";
import { setLanguage } from "@/store/languageSlice";
import useTranslation from "@/hooks/useTranslation";
import AOS from "aos";
import "aos/dist/aos.css";

const page = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [isVisible, setisVisible] = useState(true);
  const [open, setOpen] = useState(false);
  

  const categories = useSelector((state: RootState) => state.categories.data);
const firstCategoryId = categories?.[0]?.id;

const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // تهيئة AOS
    AOS.init({ once: true });

   
      setAnimate(true);
      
    
  }, []);


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
      <div className="fixed z-1000 right-0 top-0 w-full ">
        <div
          className={`flex relative justify-between  transition-[0.5s] px-6 lg:px-25 py-2 md:py-3  ${
            scrollPosition > 50 ? "bg-(--bg-color)" : "bg-white"
          }`}
        >
       <Link
        href="/"
  data-aos="flip-right"
  data-aos-once="true"   // هنا بتخليها تعمل animation مرة واحدة فقط
  data-aos-duration="1000" // مدة الانيميشن
  className={`text-[1.1rem] font-semibold flex items-center gap-x-2 ${
    scrollPosition > 50 ? "text-(--text-color)" : "text-(--bg-color)"
  }`}
>
            <img src="/logo.jpg" alt="" className=" max-w-25 rounded-xl " />
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className={`icon md:hidden  cursor-pointer  text-(--bg-color) text-2xl  z-100001 flex  flex-wrap md:flex-nowrap justify-between items-center absolute left-[47%] top-5  ${
              scrollPosition > 50 ? "text-(--main-color)" : "text-(--bg-color)"
            }`}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div
            className={`
    absolute md:static left-0 w-full
    bg-(--bg-color) md:bg-transparent
    overflow-hidden
    transform-gpu
    transition-all duration-500 ease-in-out
    md:transform-none md:opacity-100 md:max-h-full
    mt-13 md:mt-3
    ${
      open ? "opacity-100 max-h-125 rotateX-0" : "opacity-0 max-h-0 -rotateX-90"
    }
  `}
            style={{ transformOrigin: "top" }}
          >
            <ul className="flex flex-col md:flex-row md:text-center justify-center items-center md:space-x-0 gap-x-12 gap-y-5 py-4 ">
              <li className="relative">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`font-bold  md:text-(--bg-color) text-(--main-color) text-xl ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--text-color)"
                  }`}
                >
                 {t. الرئيسية}
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href={ 
      firstCategoryId
        ? `/menu?category=${firstCategoryId}`
        : "/menu"
    }
    onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--text-color)"
                  }`}
                >
                 {t.المنيو}
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--text-color)"
                  }`}
                >
                  {t["تواصل معنا"]}
                </Link>{" "}
              </li>
              <li className="relative">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={`font-bold text-xl md:text-(--bg-color) text-(--main-color) ${
                    scrollPosition > 50
                      ? "md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--text-color)"
                  }`}
                >
                  {" "}
                   {t["من نحن"]}
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <CartIcon />
            <Login />
            <div>
              <h6 onClick={() =>
        dispatch(setLanguage(lang === "ar" ? "en" : "ar"))
      }
              className={` md:text-(--bg-color) text-(--bg-color) cursor-pointer select-none ${
                    scrollPosition > 50
                      ? "text-(--main-color) md:text-(--main-color) hover:text-(--text-color)"
                      : "md:text-(--bg-color) hover:md:text-(--text-color) hover:text-(--text-color)"
                  }`} >{lang === "ar" ? "ENG" : "عربي"}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
