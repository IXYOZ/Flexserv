"use client";

import { useAppContext } from "@/context/AppContext";
import { items } from "@/lib/mockData";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Cart() {
  const { id } = useParams();
  const router = useRouter();
  const context = useAppContext();
  const [showCart, setShowCart] = useState(false);

  const {
    cart,
    addToCart,
    updateItemQty,
    removeFromCart,
    clearCart,
    currentUser,
  } = context;

  if (!context) return <div>No items context found</div>;
  const cartItem = cart.find((c) => c.itemId === Number(id));

  const item = items.find((i) => i.id === Number(id));

  if (!item) return <div>No Item</div>;
  const addItemToCard = () => {
    if (!currentUser) {
      alert("Please login")
      router.push("/login");
      return;
    }
    const newQuantity = cartItem ? cartItem.quantity + 1 : 1;
    addToCart({
      userId: currentUser.id,
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      quantity: newQuantity,
      datetime: "",
    });
    setShowCart(true);
  };

  function updateQty(id: number, qty: number) {
    if (qty < 1) qty = 1;
    updateItemQty(id, qty);
  }

  return (
    <div>
      <button
        onClick={addItemToCard}
        className="border bg-blue-500 rounded px-1 hover:bg-blue-700"
      >
        Add to Cart
      </button>
      {showCart && currentUser?.id && (
        <div className="p-4 border rounded shadow bg-gray-500">
          <h2 className="text-xl font-bold mb-2">Your Order</h2>
          <ul className="space-y-2">
            {cart.map((c) => (
              <li
                key={c.itemId}
                className="flex justify-between items-center border-b pb-1 item-le"
              >
                <span>${c.price * c.quantity} :</span>
                <div className="">
                  {cart.map((c) => (
                    <input
                      key={c.itemId}
                      value={c.quantity}
                      onChange={(e) =>
                        updateQty(item.id, Number(e.target.value))
                      }
                      type="number"
                      max={999}
                      onBlur={() => {
                        if (c.quantity < 1) updateItemQty(c.itemId, 1);
                      }}
                      className="bg-white text-black text-center max-w-8"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    removeFromCart(c.itemId);
                    setShowCart(false);
                  }}
                  className="bg-white text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mb-4 pt-2 border-t font-bold text-right">
            <Link href="/summary/cart">Proceed to summary</Link>
          </div>
        </div>
      )}
    </div>
  );
}
