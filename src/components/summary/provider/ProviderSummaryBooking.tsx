"use client";

import { useAppContext } from "@/context/AppContext";
import { listings } from "@/lib/mockData";
import { li } from "framer-motion/client";

export default function ProviderSummaryBooking() {
  const { currentUser, bookings, services, updateBookingStatus } =
    useAppContext();
  const listing = listings.find((l) => l.authorId === currentUser?.id);
  const service = services.find((s) => s.listingId === listing?.id);
  const providerBooking = bookings.filter(
    (b) => b.listingId === service?.listingId
  );

  return (
    <div className="bg-gray-100 rounded p-4 max-h-[80vh] overflow-y-auto ">
      <div className="text-center text-lg font-semibold  mb-4">
        <h1>Provider appointment summary</h1>
      </div>
      {providerBooking.length === 0 ? (
        <p className="text-center text-gray-500">No appointment yet</p>
      ) : (
        <ul className="space-y-4">
          {providerBooking.map((booking) => (
            <li
              key={booking.id}
              className="bg-white rounded shadow p-3 flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-gray-700">
                  Booking ID: {booking.id}
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
                <span className="text-black">{service?.name}</span>
                <div className="flex justify-between">
                  <span>Name: {booking.userName}</span>
                  <span>Phone: {booking.phone}</span>
                  <span>Time: {booking.datetime}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    updateBookingStatus(booking.id, "approved");
                  }}
                  className="flex-1 bg-green-500 px-2 py-1 rounded hover:bg-green-600 hover:text-white transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    updateBookingStatus(booking.id, "cancelled");
                  }}
                  className="flex-1 bg-red-500 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
