"use client";

import { useAppContext } from "@/context/AppContext";
import { div, li } from "framer-motion/client";

export default function OrderSummary() {
  const context = useAppContext();

  const { currentUser, orderItem, removeFromCart } = context;

  if (!currentUser) return null;
  const orders = orderItem.filter((c) => c.userId === currentUser.id);
  if (orders.length === 0)
    return <div className="text-center p-4">No orders yet</div>;

  return (
    <div className="bg-gray-100 rounded p-4 max-h-[80vh] overflow-y-auto ">
      <div className="text-center text-lg font-semibold mb-4">
        <h1>Your Order summary</h1>
      </div>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li
              key={o.orderId}
              className="bg-white rounded shadow p-3 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-gray-700">
                  Order ID: {o.orderId}
                </span>
                <span
                  className={`${
                    o.status === "pending"
                      ? "text-yellow-500"
                      : o.status === "approved"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {o.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-500 rounded px-2 py-1">
                    <span className="font-medium text-white">{item.itemName}</span>
                    <div className="text-white space-x-4">
                    <span>Total: {item.price * item.quantity}</span>
                    <span>{item.quantity}ea</span>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
