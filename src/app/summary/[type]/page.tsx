"use client";

import SummaryCart from "@/components/summary/user/cart/SummaryCart";
import { useState } from "react";
import SummaryBooking from "@/components/summary/user/summaryBooking";
import SummaryApplication from "@/components/summary/user/summaryApplication";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ProviderSummaryCart from "@/components/summary/provider/ProviderSummaryCart";
import OrderSummary from "@/components/summary/user/cart/OrderSummary";

export default function SummaryPage() {
  const params = useParams();
  const type = params?.type || "cart";

  const { cart, currentUser, createOrder, clearCart } = useAppContext();

  const [activeType, setActiveType] = useState(type);
  const [ShowBackBtn, setShowBackBtn] = useState(false);
  const [ShowNextBtn, setShowNextBtn] = useState(true);

  const handleNext = () => {
    if (!currentUser) return;

    if (cart.length > 0) {
      createOrder(cart, currentUser.id);
      clearCart();
    }

    setActiveType("order");
    setShowBackBtn(true);
  };

  return (
    <div className="bg-gray-200 rounded-2xl min-h-lvw">
      <div className="p-2">
        <div>
          <ul className="flex flex-wrap items-center justify-center text-gray-900 space-x-2">
            <li>
              {activeType === "cart" ? (
                <button
                  onClick={() => setActiveType("cart")}
                  className={
                    activeType === "cart"
                      ? "bg-amber-500 rounded px-2"
                      : "px-3 py-1 hover:scale-110"
                  }
                >
                  <p>Cart</p>
                </button>
              ) : (
                <button
                  onClick={() => setActiveType("order")}
                  className={
                    activeType === "order"
                      ? "bg-amber-500 rounded px-2"
                      : "px-3 py-1 hover:scale-110"
                  }
                >
                  <p>Order</p>
                </button>
              )}
            </li>
            <li>
              <button
                onClick={() => setActiveType("booking")}
                className={
                  activeType === "booking"
                    ? "bg-green-500 rounded px-2"
                    : "px-3 py-1 hover:scale-110"
                }
              >
                <p>Book</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveType("application")}
                className={
                  activeType === "application"
                    ? "bg-blue-500 rounded px-2"
                    : "px-3 py-1 hover:scale-110"
                }
              >
                <p>Application</p>
              </button>
            </li>
          </ul>
          <div>
            {currentUser?.type === "provider" && activeType === "cart" && (
              <ProviderSummaryCart />
            )}

            {currentUser?.type === "user" && activeType === "cart" && (
              <SummaryCart />
            )}
            {currentUser?.type === "user" && activeType === "order" && (
              <OrderSummary />
            )}
            {currentUser?.type === "user" && activeType === "booking" && (
              <SummaryBooking />
            )}
            {currentUser?.type === "user" && activeType === "application" && (
              <SummaryApplication />
            )}
          </div>
          <div className="grid grid-cols-2 justify-between p-2">
            <div>
              {activeType === "order" && ShowBackBtn && (
                <button
                  onClick={() => {
                    setActiveType("cart");
                    setShowNextBtn(true);
                  }}
                  className="bg-white hover:text-white hover:bg-red-500 hover:shadow-lg rounded  w-15 justify-self-start"
                >
                  Back
                </button>
              )}
            </div>
            <div className="justify-self-end">
              {activeType === "cart" && ShowNextBtn && (
                <button
                  onClick={handleNext}
                  className="bg-white hover:text-white hover:bg-green-500 hover:shadow-lg rounded w-15 "
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
