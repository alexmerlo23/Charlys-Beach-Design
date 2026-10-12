import { twMerge } from "tailwind-merge";
import { BikiniSize, ProductProps } from "../../type";
import { CartProduct, store } from "../lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import PriceTag from "./PriceTag";

const AddToCartBtn = ({
  className,
  title,
  product,
  size,
  sizeRequired = false,
  showPrice = true,
}: {
  className?: string;
  title?: string;
  product?: ProductProps;
  size?: BikiniSize;
  sizeRequired?: boolean;
  showPrice?: boolean;
}) => {
  const [existingProduct, setExistingProduct] = useState<CartProduct | null>(
    null
  );
  const { addToCart, cartProduct, decreaseQuantity } = store();

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item) => item?._id === product?._id && item.size === size
    );

    setExistingProduct(availableItem || null);
  }, [product, size, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      if (sizeRequired && !size) {
        toast.error("Select a size before adding this item.");
        return;
      }
      addToCart(product, size);
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Product is undefined!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        decreaseQuantity(existingProduct._id, existingProduct.size);
        toast.success(
          `${product?.name.substring(0, 10)} decreased successfully`
        );
      } else {
        toast.error("You can not decrease less than 1");
      }
    }
  };

  const newClassName = twMerge(
    "bg-[#5ec0eb] uppercase text-sm py-3 text-black text-center rounded-full font-bold hover:bg-[#6bd5ed] hover:text-white hover:scale-105 duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  const getRegularPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.regularPrice * existingProduct?.quantity;
      }
    } else {
      return product?.regularPrice;
    }
  };

  const getDiscountedPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.discountedPrice * product?.quantity;
      }
    } else {
      return product?.discountedPrice;
    }
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={sizeRequired && !size}
          className={newClassName}
        >
          {title ? title : "Add to cart"}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
