import { useState } from "react";
import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { store } from "../lib/store";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartProduct } = store();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#5ec0eb]">
      <div className="relative mx-auto max-w-screen-xl px-4">
        <div className="relative flex h-24 items-center justify-between md:h-28">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
            className="z-10 inline-flex h-10 w-10 items-center justify-center text-2xl text-gray-900"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Link
            to="/"
            aria-label="Home"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <img src={logo} alt="logo" className="h-auto w-20 sm:w-24" />
          </Link>
          <div className="ml-auto flex items-center gap-4 text-2xl md:ml-0">
            <Link
              to="/cart"
              aria-label={`Cart, ${cartProduct.length} items`}
              className="relative inline-flex p-2 text-gray-900 hover:text-white"
            >
              <FiShoppingBag />
              <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-redText px-1 text-[9px] text-whiteText">
                {cartProduct.length}
              </span>
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            aria-label="Site navigation"
            className="absolute left-4 right-4 top-full z-40 mt-1 grid grid-cols-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg sm:right-auto sm:w-56"
          >
            {bottomNavigation.map(({ title, link }) => (
              <Link
                to={link}
                key={title}
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 last:border-b-0 hover:bg-gray-50"
              >
                {title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
