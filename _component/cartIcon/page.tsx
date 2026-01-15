"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItems = useSelector((state: any) => state.cart.products);

  const totalItems = useMemo(() => {
    if (!isClient) return 0;

    return cartItems.reduce((total: number, item: any) => {
      return total + item.count;
    }, 0);
  }, [cartItems, isClient]);

  const totalPrice = useMemo(() => {
    if (!isClient) return 0;

    return cartItems.reduce((total: number, item: any) => {
      return total + item.totalPrice;
    }, 0);
  }, [cartItems, isClient]);

  return (
    <div>
      <Link href="/cart">
        <div className="relative">
          {isClient && totalItems > 0 && (
            <div className="absolute top-0 right-0 bg-[#EA2B0F] text-white text-[10px] font-normal w-4 h-4 rounded-full text-center">
              {totalItems}
            </div>
          )}
          {/* cart SVG */}
          <svg
            width="42"
            height="43"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.25" width="42" height="42" rx="21" fill="#FFF1EE" />
            <g clipPath="url(#clip0_1_3013)">
              <path
                d="M21.0342 14.161C20.5242 14.161 20.0511 14.2885 19.6147 14.5435C19.1784 14.7985 18.8327 15.1442 18.5777 15.5805C18.3227 16.0168 18.1952 16.49 18.1952 17H16.7502C16.7502 16.2293 16.9401 15.5182 17.3197 14.8665C17.6994 14.2148 18.2151 13.6992 18.8667 13.3195C19.5184 12.9398 20.2296 12.75 21.0002 12.75C21.7709 12.75 22.4821 12.9398 23.1337 13.3195C23.7854 13.6992 24.3011 14.2148 24.6807 14.8665C25.0604 15.5182 25.2502 16.2293 25.2502 17H28.0382C28.4462 17 28.7919 17.1445 29.0752 17.4335C29.3586 17.7225 29.5002 18.0767 29.5002 18.496C29.5002 18.5867 29.4946 18.6717 29.4832 18.751L27.9022 27.897C27.8116 28.4297 27.5622 28.8717 27.1542 29.223C26.7462 29.5743 26.2759 29.75 25.7432 29.75H16.2572C15.7246 29.75 15.2542 29.5743 14.8462 29.223C14.4382 28.8717 14.1889 28.4297 14.0982 27.897L12.5172 18.768C12.4492 18.36 12.5314 17.986 12.7637 17.646C12.9961 17.306 13.3106 17.0963 13.7072 17.017C13.7866 17.0057 13.8716 17 13.9622 17H23.8732C23.8732 16.49 23.7457 16.0168 23.4907 15.5805C23.2357 15.1442 22.8901 14.7985 22.4537 14.5435C22.0174 14.2885 21.5442 14.161 21.0342 14.161ZM28.0382 18.411H13.9622C13.9509 18.411 13.9339 18.4337 13.9112 18.479V18.513L15.4922 27.659C15.5262 27.8403 15.6056 27.9933 15.7302 28.118C15.8549 28.2427 16.0022 28.3107 16.1722 28.322L16.2572 28.339H25.7432C25.9132 28.339 26.0691 28.2852 26.2107 28.1775C26.3524 28.0698 26.4459 27.9253 26.4912 27.744L28.0892 18.496C28.0892 18.4507 28.0779 18.428 28.0552 18.428L28.0382 18.411Z"
                fill="#EA2B0F"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_3013">
                <rect
                  width="17"
                  height="17"
                  fill="white"
                  transform="matrix(1 0 0 -1 12.5 29.75)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default Page;
