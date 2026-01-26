"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCart, cleanUpCart, saveCartToUser } from "@/store/cartSlice";
import type { CartItem } from "@/store/cartSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { generateOrderNumber } from "@/lib/generateOrderNumber";
import useTranslation from "@/hooks/useTranslation";
import Loading from "@/_component/loading/page";

type DeliveryType = "pickup" | "delivery";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
 const { t ,lang} = useTranslation();
  // Cart from Redux
  const reduxCart: CartItem[] = useSelector(
    (state: RootState) => state.cart.products
  );


const [loading, setLoading] = useState(false);

  // Hydration-safe cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("cart");
      return local ? JSON.parse(local) : reduxCart || [];
    }
    return reduxCart || [];
  });

  // Sync cartItems to Redux + localStorage
  useEffect(() => {
    dispatch(setCart(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, dispatch]);

  // User info
  const user = useSelector((state: RootState) => state.auth.user);

  // Delivery / Pickup state
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("pickup");
  const [selectedBranch, setSelectedBranch] = useState("");
 const branches = [
  {
    id: "branch-1",
    name: {
      ar: "فرع سان جوزيف",
      en: "Saint Joseph Branch",
    },
  },
  {
    id: "branch-2",
    name: {
      ar: "فرع الجولي فيل",
      en: "Jolly Ville Branch",
    },
  },
];


  // Delivery form state (Unified for pickup & delivery)
  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDeliveryForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Totals
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.count, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    [cartItems]
  );

  // Delivery validation
   const isPickupValid =
  deliveryForm.name.trim() !== "" &&
  deliveryForm.phone.trim() !== "" &&
  selectedBranch !== "";

const isDeliveryValid =
  deliveryForm.name .trim() !== "" &&
  deliveryForm.phone.trim() !== "" &&
  deliveryForm.address.trim() !== "";

 

  // Confirm Order
const handleConfirmOrder = async () => {
  if (cartItems.length === 0) return;

  if (deliveryType === "pickup" && !isPickupValid) {
    alert(t.pickupRequired);
    return;
  }

  if (deliveryType === "delivery" && !isDeliveryValid) {
    alert(t.deliveryRequired);
    return;
  }

  try {

    setLoading(true);

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_number: generateOrderNumber(),
        user_id: user?.id || null,
        customer_name: deliveryForm.name,
        customer_phone: deliveryForm.phone,
        items: cartItems,
        total: totalPrice,
        delivery_type: deliveryType,
        address: deliveryType === "delivery" ? deliveryForm.address : null,
        branch: deliveryType === "pickup" ? selectedBranch : null,
        status: "pending",
      }),
    });

    const newOrder = await res.json();

    dispatch(cleanUpCart());
    localStorage.removeItem("cart");

    router.push(
      `/order-confirmation?orderNumber=${newOrder.order_number}`
    );
  } catch {
    alert(t.orderError);
  }
};



  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 space-y-6">

      {/* Delivery / Pickup */}
      <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
        <h2 className="text-lg font-semibold mb-3 text-(--text-color)"> {t["طريقة الاستلام"]}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setDeliveryType("pickup")}
            className={`px-4 py-2 rounded-xl border border-(--bg-color) cursor-pointer ${
              deliveryType === "pickup"
                ? "bg-(--bg-color) text-white"
                : "text-(--text-color)"
            }`}
          >
           {t.pickup}
          </button>
          <button
            onClick={() => setDeliveryType("delivery")}
            className={`px-4 py-2 rounded-xl border border-(--bg-color) cursor-pointer ${
              deliveryType === "delivery"
                ? "bg-(--bg-color) text-white"
                : "text-(--text-color)"
            }`}
          >
           {t.delivery}
          </button>
        </div>
      </div>

      {/* Pickup branch */}
      {deliveryType === "pickup" && (
        <div className="bg-white rounded-xl p-4 shadow space-y-4 border border-(--bg-color)">
          <h2 className="text-lg font-semibold text-(--text-color)"> {t["بيانات الاستلام"]}</h2>
          <input
            type="text"
            name="name"
            placeholder={t.الاسم}
            value={deliveryForm.name}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t.الموبايل}
            value={deliveryForm.phone}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
            <h2 className="text-lg font-semibold mb-3 text-(--text-color)">{t.selectBranch} </h2>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full rounded-lg px-3 py-2 border border-(--bg-color) text-(--text-color)"
            >
              <option value="">-- {t.selectBranch}--</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Delivery form */}
      {deliveryType === "delivery" && (
        <div className="bg-white rounded-xl p-4 shadow space-y-4 border border-(--bg-color)">
          <h2 className="text-lg font-semibold text-(--text-color)"> {t["بيانات الدليفري"]}</h2>
          <input
            type="text"
            name="name"
            placeholder={t.الاسم}
            value={deliveryForm.name}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t.الموبايل}
            value={deliveryForm.phone}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
          />
          <textarea
            name="address"
            placeholder={t.address}
            value={deliveryForm.address}
            onChange={handleDeliveryChange}
            className="w-full border rounded-lg px-3 py-2 border-(--bg-color) text-(--text-color)"
            rows={3}
          />
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-4 shadow border border-(--bg-color)">
        <h2 className="text-lg font-semibold mb-3 text-(--text-color)">{t["ملخص الطلب"]} </h2>
        <ul className="space-y-2 text-(--text-color)">
          {cartItems.map((item) => (
            <li key={`${item.product.id}-${JSON.stringify(item.details)}`}>
              {lang === "ar" ? item.product.name_ar : item.product.name_en} × {item.count} = {item.totalPrice.toFixed(2)} {t.EGP}
            </li>
          ))}
        </ul>
        <hr className="my-3" />
        <p className="text-(--text-color)">{t.TI} : {totalItems}</p>
        <p className="font-bold text-(--text-color)">{t.المجموع}: {totalPrice.toFixed(2)} {t.EGP}</p>
      </div>

      {/* Confirm Order button */}
      <button
        onClick={handleConfirmOrder}
        disabled={
    deliveryType === "pickup"
      ? !isPickupValid
      : !isDeliveryValid
  }
        className="w-full bg-(--bg-color) text-white py-3 rounded-xl font-semibold disabled:opacity-50 cursor-pointer"
      >
      {loading ? <Loading height={30} width={30} color="#FFFFFF" /> : t.confirmOrder}
      </button>
    </div>
  );
}
