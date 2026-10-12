import { Link } from "react-router-dom";
import { store } from "../lib/store";
import CartProduct from "../ui/CartProduct";
import CheckoutBtn from "../ui/CheckoutBtn";
import Container from "../ui/Container";

const Cart = () => {
  const { cartProduct } = store();
  return (
    <Container>
      {cartProduct.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section className="lg:col-span-7">
              <div className=" divide-y divide-gray-200 border-b border-t border-gray-200">
                {cartProduct.map((product) => (
                  <CartProduct
                    product={product}
                    key={`${product._id}-${product.size ?? "unset"}`}
                  />
                ))}
              </div>
            </section>
            <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Send your cart</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Enter your email to receive a copy of your cart. We will follow
                up to confirm availability and pricing. No payment is taken.
              </p>
              <CheckoutBtn products={cartProduct} />
            </section>
          </div>
        </>
      ) : (
        <div className="bg-white h-96 flex flex-col gap-12 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6">
            Your cart is empty.
          </p>
          <Link
            to={"/product"}
            className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
          >
            go to shopping
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Cart;
