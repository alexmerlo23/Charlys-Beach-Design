import { Link } from "react-router-dom";
import { BikiniSize, bikiniSizes } from "../../type";
import FormattedPrice from "./FormattedPrice";
import AddToCartBtn from "./AddToCartBtn";
import { IoClose } from "react-icons/io5";
import { CartProduct as CartLine, store } from "../lib/store";
import toast from "react-hot-toast";

const CartProduct = ({ product }: { product: CartLine }) => {
  const { removeFromCart, setCartItemSize } = store();
  const handleRemoveProduct = () => {
    if (product) {
      removeFromCart(product._id, product.size);
      toast.success(`${product?.name.substring(0, 20)} deleted successfully!`);
    }
  };
  return (
    <div className="flex py-6 sm:py-10">
      <Link to={`/product/${product?._id}`}>
        <img
          src={product?.images[0]}
          alt="productImage"
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 border border-skyText/30 hover:border-skyText duration-300"
        />
      </Link>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:pr-0">
          <div className="flex flex-col gap-1 col-span-3">
            <h3 className="text-base font-semibold w-full">
              {product?.name.substring(0, 80)}
            </h3>
            
            <p className="text-xs">
              Category: <span className="font-medium">{product?.category}</span>
            </p>
            <label
              htmlFor={`cart-size-${product._id}-${product.size ?? "unset"}`}
              className="mt-2 text-sm font-medium text-gray-700"
            >
              Size
            </label>
            <select
              id={`cart-size-${product._id}-${product.size ?? "unset"}`}
              required
              value={product.size ?? ""}
              onChange={(event) => {
                const size = event.target.value as BikiniSize;
                if (size) setCartItemSize(product._id, product.size, size);
              }}
              className="w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select a size</option>
              {bikiniSizes.map(({ value, label }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-6 mt-2">
              <p className="text-base font-semibold">
                <FormattedPrice
                  amount={product?.regularPrice * product?.quantity}
                />
              </p>
              <AddToCartBtn
                product={product}
                size={product.size}
                showPrice={false}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="absolute right-0 top-0">
              <button
                onClick={handleRemoveProduct}
                className="-m2 inline-flex p-2 text-gray-600 hover:text-red-600"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
