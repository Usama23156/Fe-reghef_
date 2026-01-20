"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCart, saveCartToUser } from "@/store/cartSlice";
import type { CartItem } from "@/store/cartSlice";
import type { RootState, AppDispatch } from "@/store/store";

type DeliveryType = "pickup" | "delivery";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Cart from Redux
  const reduxCart: CartItem[] = useSelector(
    (state: RootState) => state.cart.products
  );

  // Hydration-safe cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial load: Redux أو localStorage
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("cart");
      return local ? JSON.parse(local) : reduxCart || [];
    }
    return reduxCart || [];
  });

  // Sync cartItems changes to Redux + localStorage
  useEffect(() => {
    dispatch(setCart(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, dispatch]);

  // User info
  const user = useSelector((state: RootState) => (state as any).auth.user);

  // Delivery / Pickup state
  const [deliveryType, setDeliveryType] = useState<DeliveryType | null>(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const branches = [
    { id: "branch-1", name: "فرع سان جوزيف" },
    { id: "branch-2", name: "فرع الجولي فيل" },
  ];

  // Delivery form
  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDeliveryForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isDeliveryValid =
    deliveryForm.name && deliveryForm.phone && deliveryForm.address;

  // Totals
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.count, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    [cartItems]
  );

  // Confirm Order
  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return;


    if (deliveryType === "delivery" && !isDeliveryValid) {
      alert("اكمل بيانات الدليفري");
      return;
    }


    if (deliveryType === "pickup" && !selectedBranch) {
      alert("اختر الفرع");
      return;
    }

    
    if (user?.id) {
      try {
        await dispatch(saveCartToUser({ userId: user.id, cart: cartItems })).unwrap();
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    }

    alert("تم تأكيد الطلب!");
    router.push("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 space-y-6">

      {/* Delivery / Pickup */}
      <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
        <h2 className="text-lg font-semibold mb-3 text-(--text-color)">طريقة الاستلام</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setDeliveryType("pickup")}
            className={`px-4 py-2 rounded-xl border ${
              deliveryType === "pickup"
                ? "bg-(--bg-color) text-white"
                : "text-(--text-color)"
            }`}
          >
            استلام من الفرع
          </button>
          <button
            onClick={() => setDeliveryType("delivery")}
            className={`px-4 py-2 rounded-xl border ${
              deliveryType === "delivery"
                ? "bg-(--bg-color) text-white"
                : "text-(--text-color)"
            }`}
          >
            دليفري
          </button>
        </div>
      </div>

      {/* Pickup branch */}
      {deliveryType === "pickup" && (
        <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
          <h2 className="text-lg font-semibold mb-3 text-(--text-color)">اختر الفرع</h2>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full rounded-lg px-3 py-2 border border-(--bg-color) text-(--text-color)"
          >
            <option value="">-- اختر الفرع --</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Delivery form */}
      {deliveryType === "delivery" && (
        <div className="bg-white rounded-xl p-4 shadow space-y-4 border border-(--bg-color)">
          <h2 className="text-lg font-semibold text-(--text-color)">بيانات الدليفري</h2>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            value={deliveryForm.name}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <input
            type="tel"
            name="phone"
            placeholder="رقم الموبايل"
            value={deliveryForm.phone}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <textarea
            name="address"
            placeholder="العنوان بالكامل"
            value={deliveryForm.address}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
            rows={3}
          />
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
        <h2 className="text-lg font-semibold mb-3 text-(--text-color)">ملخص الطلب</h2>
        <ul className="space-y-2 text-(--text-color)">
          {cartItems.map((item) => (
            <li key={`${item.product.id}-${JSON.stringify(item.details)}`}>
              {item.product.name} × {item.count} = {item.totalPrice.toFixed(2)} جنيه
            </li>
          ))}
        </ul>
        <hr className="my-3" />
        <p className="text-(--text-color)">عدد المنتجات: {totalItems}</p>
        <p className="font-bold text-(--text-color)">الإجمالي: {totalPrice.toFixed(2)} جنيه</p>
      </div>

      {/* Confirm Order button */}
      <button
        onClick={handleConfirmOrder}
        disabled={
          !deliveryType ||
          (deliveryType === "pickup" && !selectedBranch) ||
          (deliveryType === "delivery" && !isDeliveryValid)
        }
        className="w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold disabled:opacity-50"
      >
        تأكيد الطلب
      </button>
    </div>
  );
}
