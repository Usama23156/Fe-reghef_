"use client";
import useTranslation from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "@/store/cartSlice";

interface Product {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
  price: number;
  box_size?: number; // 1, 4, 8, 10
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

interface BoxItems {
  kofta: number;
  shish: number;
  hawawshi: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;
 const isBox = Boolean(product.box_size && product.box_size > 1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.products);
  const [quantity, setQuantity] = useState<number>(0);
  const [boxItems, setBoxItems] = useState<BoxItems>({
    kofta: 0,
    shish: 0,
    hawawshi: 0,
  });

  type BoxItemKey = keyof BoxItems;

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(0);
      setBoxItems({ kofta: 0, shish: 0, hawawshi: 0 });
    }
  }, [isOpen, product]);

  const existingCartItem = cartItems.find(
    (item: any) => item.product.id === product.id
  );

  const totalBox =
  boxItems.kofta + boxItems.shish + boxItems.hawawshi;

const canAddToCart = isBox
  ? totalBox === product.box_size
  : quantity > 0;

  const increaseItem = (item: BoxItemKey) => {
  const total = Object.values(boxItems).reduce((a, b) => a + b, 0);
  if (product?.box_size && total >= product.box_size) return;

  setBoxItems({
    ...boxItems,
    [item]: boxItems[item] + 1,
  });
};
const { lang ,t} = useTranslation();
const decreaseItem = (item: BoxItemKey) => {
  if (boxItems[item] <= 0) return;

  setBoxItems({
    ...boxItems,
    [item]: boxItems[item] - 1,
  });
};

const boxItemsLabels: Record<
  BoxItemKey,
  { ar: string; en: string }
> = {
  kofta: {
    ar: "كفتة",
    en: "Kofta",
  },
  shish: {
    ar: "شيش",
    en: "Shish",
  },
  hawawshi: {
    ar: "حواوشي",
    en: "Hawawshi",
  },
};

const addToCart = () => {
  if (!product) return;

  if (isBox) {
    const totalBox = Object.values(boxItems).reduce(
      (a, b) => a + b,
      0
    );

    if (totalBox !== product.box_size) return;

    dispatch(
      addCart({
        product,
        details: boxItems, // مكونات البوكس
        count: 1,          // بوكس واحد بس
      })
    );
  } else {
    if (quantity <= 0) return;

    dispatch(
      addCart({
        product,
        count: quantity, // عدد الساندوتشات
      })
    );
  }

  // reset
  setQuantity(0);
  setBoxItems({ kofta: 0, shish: 0, hawawshi: 0 });
  onClose();
};


  return (
    <div>
      <div
        data-aos="flip-down"
        className="fixed inset-0 z-50 flex items-center justify-center mt-24"
      >
        <div className="bg-(--bg-color) rounded-2xl p-6 relative mx-5">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-(--main-color) hover:text-gray-400 cursor-pointer"
          >
            &times;
          </button>
          <div className="md:flex gap-x-5 items-center pt-2 pb-4 px-3">
            <img
              src={product.image}
              alt={product.name_en}
              className="rounded-lg w-72 lg:max-w-60 m-auto"
            />
            <div className="mt-4 md:mt-0 space-y-4">
              <div className="flex justify-between">
                <h2 className="text-base font-semibold text-center text-(--main-color)">
                  {lang === "ar" ? product.name_ar : product.name_en}
                </h2>
                <p className="text-base max-w-72 font-semibold text-(--main-color)">
                  {product.price}
                </p>
              </div>
              {isBox ? (
                <div className="box-selection mt-4">
                  <h3 className="font-bold mb-2"> {t["popp-cote"]}</h3>
                  {(["kofta", "shish", "hawawshi"] as BoxItemKey[]).map(
                    (item) => (
                      <div
                        key={item}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>{boxItemsLabels[item][lang]}</span>
                       <div className="flex items-center gap-2 bg-[#F3F5F9] rounded p-1">
  <button
    onClick={() => increaseItem(item)}
    className="w-8 h-8 text-lg rounded cursor-pointer text-black"
    disabled={product.box_size ? totalBox >= product.box_size : false}
  >
    +
  </button>

  <span className="text-black w-6 text-center">
    {boxItems[item]}
  </span>

  <button
    onClick={() => decreaseItem(item)}
    className="w-8 h-8 text-lg rounded cursor-pointer text-black"
    disabled={boxItems[item] <= 0}
  >
    −
  </button>
</div>
                      </div>
                    )
                  )}
                  {product.box_size && totalBox !== product.box_size && (
                    <p className="text-(--main-color) text-sm mt-1">
                       {t.box1}{product.box_size} {t.box2} 
                    </p>
                  )}
                </div>
              ):( <div className="flex items-center gap-7 justify-center bg-[#F3F5F9] rounded p-1 w-full">
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 text-lg rounded cursor-pointer text-black"
                    >
                      +
                    </button>

                    <span className="text-black">
                      {isNaN(quantity) ? 0 : quantity}
                    </span>

                    <button
                      onClick={() => setQuantity((q) => q - 1)}
                      className="w-8 h-8 text-lg rounded cursor-pointer text-black"
                      disabled={quantity <= 0}
                    >
                      −
                    </button>
                  </div>)}
              <div>
                <div className="flex flex-row-reverse justify-between items-center md:flex-col gap-2">
                 
                  <button
                    onClick={addToCart}
                    disabled={!canAddToCart}
                    className="bg-(--main-color) text-(--text-color) py-2 rounded-lg cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {t.add} 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
