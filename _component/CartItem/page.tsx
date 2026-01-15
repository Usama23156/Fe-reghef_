"use client";
import { decrease, increase, removeItem } from "@/store/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function page({ data }: { data: any }) {
  const dispatch = useDispatch();

  const increasee = () => dispatch(increase(data.product));
  const decreseItems = () => dispatch(decrease(data.product));
  const remooveItem = () => dispatch(removeItem(data.product));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b ">
      <div className="flex items-center gap-4 w-full sm:w-1/4">
        <img
          src={data.product.image}
          alt={data.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-col">
          <p className="text-gray-800 font-medium items-end flex">{data.product.name}</p>
          {data.details && (
  <ul className="text-gray-600 flex gap-4">
    {data.details.kofta > 0 && <li>{data.details.kofta} كفته</li>}
    {data.details.shish > 0 && <li>{data.details.shish} شيش</li>}
    {data.details.hawawshi > 0 && (
      <li>{data.details.hawawshi} حواوشي</li>
    )}
  </ul>
)}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-1/4 justify-center">
        <button
          onClick={increasee}
          className="w-8 h-8 border rounded-full text-gray-600 cursor-pointer"
        >
          +
        </button>
        <span className="min-w-8 text-center text-sm text-gray-700">
          {data.count}
        </span>
        <button
          onClick={decreseItems}
          className="w-8 h-8 border rounded-full text-gray-600 cursor-pointer"
        >
          −
        </button>
      </div>

      <div className="text-gray-800 font-semibold w-full sm:w-1/4 text-center sm:text-left">
        {data.totalPrice.toFixed(2)}
      </div>

      <div className="w-full sm:w-1/4 text-center sm:text-right">
        <button
          onClick={remooveItem}
          className="text-red-500 text-sm hover:underline cursor-pointer"
        >
          حذف
        </button>
      </div>
    </div>
  );
}
