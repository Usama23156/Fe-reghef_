"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "@/store/cartSlice";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number; 
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.products); 
  const [quantity, setQuantity] = useState<number>(0);

  // ✅ Reset quantity when modal opens or product changes
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(0);
    }
  }, [isOpen, product]);

  const existingCartItem = cartItems.find(
    (item: any) => item.product.id === product.id
  );

  // ✅ Send correct structure to addCart
  const addToCart = () => {
    if (quantity > 0) {
      dispatch(addCart({
  product,
  quantity,
}));
      setQuantity(0); 
      onClose(); 
    } else {
      console.error('Quantity must be greater than 0');
    }
  };

  const quantityInCart = existingCartItem ? existingCartItem.count : 0;
  

  return (
    <div>
      <div  data-aos="flip-down" className="fixed inset-0 z-50 flex items-center justify-center mt-24">
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
              alt={product.name}
              className="rounded-lg w-72 lg:max-w-60 m-auto"
            />
            <div className="mt-4 md:mt-0 space-y-4">
              <div className="flex justify-between">
                <h2 className="text-base font-semibold text-center text-(--main-color)">
                  {product.name}
                </h2>
                <p className="text-base max-w-72 font-semibold text-(--main-color)">
                  {product.price}
                </p>
              </div>
              <div>
                <div className="flex flex-row-reverse justify-between items-center md:flex-col gap-2">
                  <div className="flex items-center gap-7 justify-center bg-[#F3F5F9] rounded p-1 w-full">
                    

                    <button
                      onClick={() => setQuantity((q) => q + 1)}

                      className="w-8 h-8 text-lg rounded cursor-pointer text-black"
                    >
                      +
                    </button>

                    <span className="text-black">{isNaN(quantity) ? 0 : quantity}</span>

                    <button
                      onClick={() => setQuantity((q) =>  q - 1)}
                      className="w-8 h-8 text-lg rounded cursor-pointer text-black"
                      disabled={quantity <= 0}
                    >
                      −
                    </button>
                  </div>

                  <button
                    onClick={addToCart}
                    disabled={quantity <= 0}
                    className="bg-(--main-color) text-(--text-color) py-2 rounded-lg cursor-pointer w-full disabled:opacity-50"
                  >
                    اضف الي السله
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
