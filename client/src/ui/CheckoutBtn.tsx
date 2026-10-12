import { FormEvent, useState } from "react";
import { CartProduct as CartLine, store } from "../lib/store";
import { config } from "../../config";
import toast from "react-hot-toast";

const CheckoutBtn = ({ products }: { products: CartLine[] }) => {
  const resetCart = store((state) => state.resetCart);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const hasMissingSize = products.some(
    (product) =>
      product.category?.trim().toLowerCase() === "bikinis" && !product.size
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasMissingSize) {
      toast.error("Select a size for every item before submitting your order.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(`${config.baseUrl}/order-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          items: products.map((product) => ({
            id: product._id,
            name: product.name,
            category: product.category,
            quantity: product.quantity,
            size: product.size,
            image: product.images?.[0],
          })),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Could not send your cart.");
      }

      resetCart();
      toast.success("Cart sent. Check your email for a confirmation.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not send your cart."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="cart-email" className="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <input
        id="cart-email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      />
      <label
        htmlFor="cart-phone"
        className="mt-4 block text-sm font-medium text-gray-700"
      >
        Phone number
      </label>
      <input
        id="cart-phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        minLength={7}
        maxLength={30}
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      />
      <p className="mt-2 text-xs text-gray-500">
        We may use this number to follow up about your cart.
      </p>
      {hasMissingSize && (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          Select a size for every item before submitting your order.
        </p>
      )}
      <button
        type="submit"
        disabled={isSending || products.length === 0 || hasMissingSize}
        className="mt-4 w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? "Submitting..." : "Submit Order and Send Email Confirmation"}
      </button>
    </form>
  );
};

export default CheckoutBtn;
