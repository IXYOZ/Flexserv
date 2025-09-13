"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";
import { useState } from "react";

export default function SummaryCart() {
  const context = useAppContext();

  const { currentUser, cart, updateItemQty, updateStatus, removeFromCart } = context;
  const [status, setStatus] = useState()

  if (!currentUser) return null;
  const userCart = cart.filter(c => c.userId === currentUser.id)

  const filteredUser =
    currentUser?.type === "provider"
      ? cart.filter(
          (c) =>
            listings.find(
              (l) => l.id === items.find((i) => i.id === c.itemId)?.listingId
            )?.authorId === currentUser.id
        )
      : cart.filter((c) => c.userId === currentUser?.id);

  if (filteredUser.length <= 0) return <div>No items in cart</div>;

  function updateQty(id: string, qty: number) {
    if (qty < 1) qty = 1;
    updateItemQty(id, qty);
  }

  return (
    <div className="bg-gray-100 h-96 px-4 rounded ">
      <ul className="grid grid-rows-3 md:grid-rows-6">
        {filteredUser.map((c) => (
          <li
            key={c.userId-c.itemId}
            className="flex justify-between items-center border-b pb-1 pt-2 item-le"
          >
            <span className="text-black">{c.userName}</span>
            <span className="text-black">{c.itemName}</span>
            <span className="text-black">${c.price * c.quantity} :</span>
            <div className="">
              <input
                value={c.quantity}
                onChange={(e) => {
                  updateQty(c.id, Number(e.target.value));
                }}
                type="number"
                max={999}
                onBlur={() => {
                  if (c.quantity < 1) updateItemQty(c.id, 1);
                }}
                className="bg-white text-black text-center max-w-8"
                disabled={currentUser.type === "provider"}
              />
            </div>
            <span className="text-green-500">{c.status || "pending"}</span>

            {currentUser.type === "provider" ? (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    updateStatus(c.id,"approved")
                  }}
                  className="bg-white text-green-600 px-2 py-1 rounded hover:bg-green-600 hover:text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    removeFromCart(c.id);
                  }}
                  className="bg-white text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if(status !== "approved"){
                    removeFromCart(c.id);
                  }
                }}
                className={`bg-white text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white ${c.status === "approved" ? "opacity-50 cursor-not-allowed hover:bg-gray-500 hover:text-green-600": ""}`}
                disabled={c.status ==="approved"}
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
