"use client";

import { useAppContext } from "@/context/AppContext";
import { listings, services } from "@/lib/mockData";
export default function SummaryBooking() {
  const context = useAppContext();

  const { currentUser, bookings, removeBooking } = context;
  if (!currentUser) return <div>Please login to see your bookings.</div>;

  const myBooking = bookings.filter((b) => b.userId === currentUser?.id);

  return (
    <div>
      <div className="bg-white border rounded">
        <div className="border border-b-black">
          <h1 className="text-black text-center font-semibold py-2">
            Your summary
          </h1>
        </div>
        {myBooking.length > 0 ? (
          myBooking.map((booking) => {
            const service = services.find((s) => s.id === booking.serviceId);
            const listing = listings.find((l) => l.id === service?.listingId);

            return (
              <div key={booking.id} className="p-2">
                <p className="text-black font-semibold">
                  {listing?.name} : {service?.name}
                </p>
                <p className="text-black">Name: {booking.userName}</p>
                <p className="text-black">Phone: {booking.phone}</p>
                <div className="flex space-x-4">
                  <p className="text-black">Date: {booking.datetime}</p>
                  <p className="text-black">Price: {service?.price}</p>
                </div>
                <div className="space-x-2 pt-2">
                {/* <button className="border border-yellow-600 rounded px-2 hover:text-white hover:bg-yellow-500">Edit</button> */}
                <button className="border border-red-600 rounded px-2 hover:text-white hover:bg-red-500">Cancel</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-center border bg-red-500">
            No Appointment
          </div>
        )}
      </div>
    </div>
  );
}
