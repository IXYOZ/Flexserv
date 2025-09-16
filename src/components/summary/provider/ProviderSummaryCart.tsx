"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";
import { p } from "framer-motion/client";

export default function ProviderSummaryCart() {
  const { currentUser, cart, orderItem, updateOrderStatus, removeFromCart } =
    useAppContext();
  if (!currentUser) return <div>Please login</div>;

  const providerListings = listings.filter(
    (l) => l.authorId === currentUser.id
  );

  const providerCart = orderItem.filter((o) =>
    providerListings.some((l) => l.id === o.listingId)
  );

  return (
    <div className="bg-gray-100 rounded p-4 max-h-[80vh] overflow-y-auto">
      <div className="text-center text-lg font-semibold  mb-4">
        <h1>Provider orders summary</h1>
      </div>

      {providerCart.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet</p>
      ) : (
        <ul className="space-y-4 ">
          {providerCart.map((o) => (
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
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gray-500 rounded px-2 py-1"
                  >
                    <span className="font-medium text-white">
                      {item.itemName}
                    </span>
                    <div className="text-white text-sm space-x-2">
                      <span>Total: {item.price * item.quantity}</span>
                      <span>{item.quantity} ea</span>
                    </div>
                  </div>
                ))}
              </div>

              {currentUser.type === "provider" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      updateOrderStatus(o.orderId, "approved");
                    }}
                    className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(o.orderId, "cancelled");
                    }}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
