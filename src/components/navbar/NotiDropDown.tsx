"use client";

import { useAppContext } from "@/context/AppContext";
import { items, services, jobs, listings } from "@/lib/mockData";
import { RouteKind } from "next/dist/server/route-kind";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NotiDropDown() {
  const router = useRouter();
  const {
    cart,
    bookings,
    applications,
    orderItem,
    updateItemQty,
    removeFromCart,
    currentUser,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  
  

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);


  if(!currentUser) return null
  let filteredCart =[]
  let filteredBooking =[]
  let filteredApplication =[]
  if(currentUser.type === "provider"){
   filteredCart = orderItem.filter(order => order.items.some(item => listings.find(l => l.id === item.listingId)?.authorId === currentUser.id))
   filteredBooking = bookings.filter(b => listings.find(l => l.id === services.find(s => s.id === b.serviceId)?.listingId)?.authorId === currentUser.id)
   filteredApplication = applications.filter(a => listings.find(a => a.id === jobs.find(j => j.id === a.id)?.listingId)?.authorId === currentUser.id)
  }else{
    filteredCart = cart.filter(c => c.userId === currentUser.id)
    filteredBooking = bookings.filter(b => b.userId === currentUser.id)
    filteredApplication = applications.filter(a => a.userId === currentUser.id)
  }
  



  const noti = filteredCart.length + filteredBooking.length + filteredApplication.length;

  const itemType = [
    (currentUser.type ==="provider"? { type: "order", label: "Order", count: filteredCart.length }:{ type: "cart", label: "Cart", count: filteredCart.length }),
    { type: "booking", label: "Booking", count: filteredBooking.length },
    { type: "application", label: "Application", count: filteredApplication.length },
  ];

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
          className="absolute right-0 -bottom-15 mt-2 w-l bg-white border-t-gray-600 rounded shadow-lg p-4 z-50"
        >
          <ul className="space-y-2">
            {itemType.map((item) =>
              item.count > 0 ? (
                <li
                  key={item.type}
                  className="flex justify-between space-x-2 items-center"
                >
                  <button
                    onClick={() => router.push(`/summary/${item.type}`)}
                    className="flex flex-auto justify-between space-x-2"
                  >
                    <span className="flex text-black">{item.label}</span>
                    <span className="rounded-2xl  bg-red-500 text-white px-2">
                      {item.count}
                    </span>
                  </button>
                </li>
              ) : (
                null
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
