"use client";

import { useAppContext } from "@/context/AppContext";
import { listings, services } from "@/lib/mockData";
import { ul } from "framer-motion/client";
export default function SummaryBooking() {
  const context = useAppContext();

  const { currentUser, bookings, removeBooking } = context;
  if (!currentUser) return <div>Please login to see your bookings.</div>;

  const myBooking = bookings.filter((b) => b.userId === currentUser?.id);

  return (
    <div className="bg-gray-100 rounded p-4 max-h-[80vh] overflow-y-auto">
      <div className="text-center text-lg font-semibold mb-4">
        <h1>Your booking summary</h1>
      </div>
      {myBooking.length === 0 ? (
        <div className="text-center text-gray-500">No booking yet</div>
      ) : (
        myBooking.map((booking) => {
          const service = services.find((s) => s.id === booking.serviceId);
          const listing = listings.find((l) => l.id === service?.listingId);

          return (
            <li
              key={booking.id}
              className="bg-white rounded shadow p-3 flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-gray-700">
                  Booked Id: {booking.id}
                </span>
                <span
                  className={`${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "approved"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div key={booking.id} className="flex flex-col gap-1">
                <span className="text-black">
                  {listing?.name} : {service?.name}
                </span>
                <div className="flex justify-between">
                  <span>Name: {booking.userName}</span>
                  <span>Phone: {booking.phone}</span>
                  <span>Date: {booking.datetime}</span>
                  <span>Price: {service?.price}</span>
                </div>
              </div>
              <div className="space-x-2 pt-2">
                {/* <button className="border border-yellow-600 rounded px-2 hover:text-white hover:bg-yellow-500">Edit</button> */}
                <button
                  onClick={() => removeBooking(booking.id)}
                  className="flex-1 bg-red-500 rounded px-2 py-1 hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </li>
          );
        })
      )}
    </div>
  );
}
