"use client";
import React, { useState, useMemo, useEffect } from "react";
import ProductPopp from "@/_component/productPopp/page";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import { fetchCategories } from "@/store/categorySlice";
import type { RootState, AppDispatch } from "@/store/store";
import { useParams } from "next/navigation";
import Loading from "@/_component/loading/page";
import { Category } from "@/types/category";
import { product } from "@/types/products";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category_id: string;
}

export const dynamic = "force-dynamic";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string | undefined;

  const { data: categories } = useSelector(
    (state: RootState) => state.categories
  );

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

 useEffect(() => {
  if (!categories?.length) return;

  if (id) {
    setActiveTabId(id);
  } else {
    setActiveTabId(categories[0].id.toString());
  }
}, [id, categories]);

    

  const openModal = (item: Product) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const activeItems = useMemo(() => {
    if (!products || !activeTabId) return [];
    return products.filter(
      (item) => item.category_id.toString() === activeTabId
    );
  }, [products, activeTabId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="pt-16">
      <ul className="flex justify-center gap-4">
        {categories?.map((item: Category) => (
          <li
            key={item.id}
            onClick={() => setActiveTabId(item.id.toString())}
            className={`cursor-pointer ${
              activeTabId === item.id.toString()
                ? "font-bold text-red-600"
                : ""
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {activeItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="border rounded-lg p-4 cursor-pointer"
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProductPopp
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Page;
