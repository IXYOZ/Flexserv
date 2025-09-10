"use client";

import { useAppContext } from "@/context/AppContext";
import { items } from "@/lib/mockData";
import { RouteKind } from "next/dist/server/route-kind";
import { useRouter } from "next/navigation";

export default function CartDropDown() {
  const router = useRouter()
  const { cart,bookings, applications, updateItemQty, removeFromCart, currentUser } = useAppContext();

  const itemType = [
    {type: "cart", label: "Cart", count: cart.length},
    {type: "booking", label: "Booking", count: bookings.length},
    {type: "application", label: "Application", count: applications.length}
  ]



  return (
    <div className="absolute right-0 mt-2 w-l bg-white border rounded shadow-lg p-4 z-50">
      {cart && (
        <ul className="space-y-2">
          {itemType.map((item) => (
            <li key={item.type} className="flex justify-between items-center">
              <button onClick={() => router.push(`/summary?initialType=${item.type}`)}>
                <span className="flex text-black">{item.label}</span>
              </button>
              <span className="rounded-full bg-red-500 text-white px-1">{item.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
