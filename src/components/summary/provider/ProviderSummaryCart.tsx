"use client";

import { useAppContext } from "@/context/AppContext";
import { items, listings } from "@/lib/mockData";

export default function ProviderSummaryCart() {
  const { currentUser, cart, updateStatus, removeFromCart } = useAppContext();
  if (!currentUser) return <div>Please login</div>;

  const filteredListingCart = cart.filter(
    (c) =>
      listings.find(
        (l) => l.id === items.find((i) => i.id === c.itemId)?.listingId
      )?.authorId === currentUser.id
  );


  const providerCart = cart.filter((c) => listings.filter((l) => l.authorId === currentUser.id).some((l) => l.id === c.listingId))

  return (
    <div className="bg-gray-100 h-96 px-4 rounded ">
      <div className="font-semibold">Provider</div>
      <ul className="grid grid-rows-3 md:grid-rows-6">
        {providerCart.map((c) => (
          <li
            key={c.userId - c.itemId}
            className="flex justify-between items-center border-b pb-1 pt-2 item-le"
          >
            <span className="text-black">{c.userName}</span>
            <span className="text-black">{c.itemName}</span>
            <span className="text-black">${c.price * c.quantity} :</span>
            <div className="">
              <span>{c.quantity}</span>
            </div>
            <span className="text-green-500">{c.status || "pending"}</span>

            {currentUser.type === "provider" && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    updateStatus(c.id, "approved");
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
