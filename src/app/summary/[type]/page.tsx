"use client";

import SummaryCart from "@/components/summary/user/cart/SummaryCart";
import { useState } from "react";
import SummaryBooking from "@/components/summary/user/summaryBooking";
import SummaryApplication from "@/components/summary/user/summaryApplication";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import ProviderSummaryCart from "@/components/summary/provider/ProviderSummaryCart";
import OrderSummary from "@/components/summary/user/cart/OrderSummary";
import { items, listings } from "@/lib/mockData";
import ProviderSummaryBooking from "@/components/summary/provider/ProviderSummaryBooking";

export default function SummaryPage() {
  const params = useParams();
  const type = params?.type

  const { cart, currentUser, createOrder, clearCart } = useAppContext();

  const [activeType, setActiveType] = useState(type);
  const [ShowBackBtn, setShowBackBtn] = useState(false);
  const [ShowNextBtn, setShowNextBtn] = useState(true);

  const handleNext = () => {
    if (!currentUser) return;
    const listingId = cart[0].listingId;
    if (cart.length > 0) {
      createOrder(cart, currentUser.id, listingId);
      //clearCart();
    }
    setActiveType("order");
    setShowBackBtn(true);
  };

  return (
    <div className="bg-gray-200 rounded-2xl overflow-y-auto">
      <div className="p-2">
        <div>
          {activeType === "order" ? null : (
            <ul className="flex flex-wrap items-center justify-center text-gray-900 space-x-2">
              <li>
                <button
                  onClick={() => setActiveType("cart")}
                  className={
                    activeType === "cart"
                      ? "bg-amber-500  rounded px-2 hover:scale-120 shadow-lg"
                      : "px-3 py-1 hover:scale-120 shadow-lg"
                  }
                >
                  <p>Cart</p>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveType("booking")}
                  className={
                    activeType === "booking"
                      ? "bg-green-500 rounded px-2 hover:scale-120 shadow-lg"
                      : "px-3 py-1 hover:scale-120 shadow-lg"
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
                      ? "bg-blue-500 rounded px-2 hover:scale-120 shadow-lg"
                      : "px-3 py-1 hover:scale-120 shadow-lg"
                  }
                >
                  <p>Application</p>
                </button>
              </li>
            </ul>
          )}

          <div>
            {currentUser?.type === "provider" && activeType === "order" && (
              <ProviderSummaryCart />
            )}
            {currentUser?.type === "provider" && activeType === "booking" && (
              <ProviderSummaryBooking />
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
              {activeType === "order"&& currentUser?.type === "user"?(
                <button
                  onClick={() => {
                    setActiveType("cart");
                    setShowNextBtn(true);
                  }}
                  className="bg-white hover:text-white hover:bg-red-500 hover:shadow-lg rounded  w-15 justify-self-start"
                >
                  Back
                </button>
              ):(
                null
              )}
            </div>
            <div className="justify-self-end">
              {activeType === "cart" && ShowNextBtn && cart.length > 0 && (
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
