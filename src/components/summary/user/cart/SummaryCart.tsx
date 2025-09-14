"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SummaryCart() {
  const context = useAppContext();
  const router = useRouter();

  const { currentUser, cart, createOrder, updateItemQty, removeFromCart } =
    context;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if(!currentUser) return null

  const userCart = cart.filter((c) => c.userId === currentUser?.id);

  function updateQty(id: string, qty: number) {
    if (qty < 1) qty = 1;
    updateItemQty(id, qty);
  }

  function toggleSelect(id: string) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function createToOrder() {
    const itemToOrder = userCart.filter((c) => selectedItems.includes(c.id))
    if (itemToOrder.length === 0) return;
    
    createOrder(itemToOrder,Number(currentUser?.id));
    setSelectedItems([])
  }

  return (
    <div className="bg-gray-100 h-96 px-4 rounded ">
      <h2 className="font-semibold text-xl text-center border p-3">
        Your Cart summary
      </h2>
      <ul className="grid grid-rows-3 md:grid-rows-6">
        {userCart.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center border-b pb-1 pt-2 item-le"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(c.id)}
              onChange={(e) => {toggleSelect(c.id)}}
            />
            <span>{c.id}</span>
            <span className="text-black">{c.itemName}</span>
            <span className="text-black">${c.price * c.quantity} :</span>
            <div className="">
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
            </div>
            <div className="flex justify-center">
              <button onClick={() => removeFromCart(c.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
