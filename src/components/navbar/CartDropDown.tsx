"use client";

import { useAppContext } from "@/context/AppContext";
import { items } from "@/lib/mockData";
import { div } from "framer-motion/client";
import { RouteKind } from "next/dist/server/route-kind";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CartDropDown() {
  const router = useRouter();
  const {
    cart,
    bookings,
    applications,
    updateItemQty,
    removeFromCart,
    currentUser,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const itemType = [
    { type: "cart", label: "Cart", count: cart.length },
    { type: "booking", label: "Booking", count: bookings.length },
    { type: "application", label: "Application", count: applications.length },
  ];

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const noti = cart.length + bookings.length + applications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border border-red-400 text-red px-2 rounded-md hover:border-red-500 hover:bg-red-200"
      >
        <p className="text-red-300 font-semibold">{noti ? noti : 0}</p>
      </button>

      {open && (
        <div
          ref={ref}
          className="absolute right-0 -bottom-31 mt-2 w-l bg-white border-t-gray-600 rounded shadow-lg p-4 z-50"
        >
          <ul className="space-y-2">
            {itemType.map((item) => (
              <li
                key={item.type}
                className="flex justify-between space-x-2 items-center"
              >
                {/* <button onClick={() => router.push(`/summary?activeType=${item.type}`)}>
              </button> */}
                <span className="flex text-black">{item.label}</span>
                <span className="rounded-full bg-red-500 text-white px-1">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
