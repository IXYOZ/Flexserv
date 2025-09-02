"use client";

import { useAppContext } from "@/context/AppContext";
import { items } from "@/lib/mockData";

export default function CartDropDown() {
  const { cart, updateItemQty, removeFromCart, currentUser } = useAppContext();





  return (
    <div className="absolute right-0 mt-2 w-l bg-white border rounded shadow-lg p-4 z-50">
      {cart && (
        <ul className="space-y-2">
          {cart.map((c) => (
            <li key={c.itemId} className="flex justify-between items-center">
              <span className="flex text-black">{c.itemName}</span>
              <input
                type="number"
                min={0}
                value={c.quantity}
                onChange={(e) =>
                  updateItemQty(c.itemId, Number(e.target.value))}
                className="w-8  text-black text-center" 
              />
              <button onClick={() => removeFromCart(c.itemId)} className="border bg-red-500 text-white rounded px-2">-</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
