"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SummaryCart() {
  const context = useAppContext();

  const { currentUser, cart, toggleSelect, updateItemQty, removeFromCart } =
    context;


  if (!currentUser) return null;

  const userCart = cart.filter((c) => c.userId === currentUser?.id);

  function updateQty(id: string, qty: number) {
    if (qty < 1) qty = 1;
    updateItemQty(id, qty);
  }


  return (
    <div className="bg-gray-100 rounded p-4 max-h-[80vh] overflow-y-auto">
      <div>
        <h1 className="font-semibold text-lg text-center mb-4">
          Your cart summary
        </h1>
      </div>

      {userCart.length === 0 ? (
        <p className="text-center text-gray-500">No Items yet</p>
      ) : (
        <ul className="grid grid-rows-3 md:grid-rows-6">
          {userCart.map((c) => (
            <li
              key={c.id}
              className="bg-white rounded-2xl shadow p-3 flex flex-col gap-2"
            >
              <div>
                <input
                  type="checkbox"
                  checked={c.selectedItem}
                  onChange={() => {
                    toggleSelect(c.id);
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="">{c.itemName}</span>
                <div className="flex justify-between">
                  <span className="">Total: {c.price * c.quantity}$</span>
                  <div className="flex space-x-2">
                  <input
                    value={c.quantity}
                    onChange={(e) => {
                      updateQty(c.id, Number(e.target.value));
                    }}
                    type="number"
                    min={1}
                    max={999}
                    onBlur={() => {
                      if (c.quantity < 1) updateItemQty(c.id, 1);
                    }}
                    className="bg-white text-black text-center max-w-8"
                  />
                  <p>ea</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 justify-center text-center bg-red-500 text-white py-1 rounded hover:bg-red-600 transition">
                <button onClick={() => removeFromCart(c.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
