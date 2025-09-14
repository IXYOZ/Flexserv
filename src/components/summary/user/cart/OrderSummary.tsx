"use client";

import { useAppContext } from "@/context/AppContext";
import { div, li } from "framer-motion/client";

export default function OrderSummary() {
  const context = useAppContext();

  const { currentUser, orderItem } = context;

  if (!currentUser) return null;
  const orders = orderItem.filter((c) => c.userId === currentUser.id);
  if (orders.length === 0)
    return <div className="text-center p-4">No orders yet</div>;

  return (
    <div className="bg-gray-100  px-4 py-4 rounded max-h-[500px] overflow-y-auto ">
      <div>
        <h1 className="flex justify-center font-semibold text-xl border p-2">
          Your Order summary
        </h1>
      </div>

        {orders.map((o) => (
          <li
            key={o.orderId}
            className="flex justify-between items-center border-b pb-1 pt-2 item-le"
          >
            <div className="flex justify-between">
              <span className="text-black">Order ID: {o.orderId}</span>
              
            </div>
            <ul className="ml-2">
              {o.items.map((item) => (
                <li key={item.id}>
                  <span>{item.itemName}</span>
                  <span>{item.quantity}</span>
                  <span>{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
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
          </li>
        ))}
    </div>
  );
}
