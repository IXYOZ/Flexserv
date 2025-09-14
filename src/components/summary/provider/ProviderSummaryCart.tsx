"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";

export default function ProviderSummaryCart() {
  const { currentUser, cart, orderItem, updateStatus, removeFromCart } =
    useAppContext();
  if (!currentUser) return <div>Please login</div>;

  const providerListings = listings.filter(
    (l) => l.authorId === currentUser.id
  );

  const providerCart = orderItem.filter((o) =>
    providerListings.some((l) => l.id === o.listingId)
  );

  return (
    <div className="bg-gray-100 h-96 px-4 rounded ">
      <div className="font-semibold border p-2"><h1 className="text-center">Provider orders summary</h1></div>
      <ul className="grid grid-rows-3 md:grid-rows-6">
        {providerCart.map((o) => (
          <div
            key={o.orderId}
            className="flex justify-between items-center border-b pb-1 pt-2 item-le"
          >
            <div>{o.orderId}</div>
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

            {o.items.map((item) => (
              <div key={item.id} className="flex space-x-2">
                <span className="text-black">{item.itemName}</span>
                <span className="text-black">
                  ${item.price * item.quantity} :
                </span>
                <div className="">
                  <span>{item.quantity}</span>
                </div>
              </div>
            ))}
            {currentUser.type === "provider" && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    updateStatus(o.orderId, "approved");
                  }}
                  className="bg-white text-green-600 px-2 py-1 rounded hover:bg-green-600 hover:text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    updateStatus(o.orderId, "cancelled");
                  }}
                  className="bg-white text-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
