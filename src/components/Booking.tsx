import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";
import { DateInput } from "@heroui/date-input";
import { useRouter } from "next/navigation";

interface BookingProps {
  postId: number;
  serviceId?: number;
}

export default function Booking({ postId }: BookingProps) {
  const context = useAppContext();
  const router = useRouter();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    tel: "",
    date: "",
  });

  const { bookings, removeBooking, currentUser } = context;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!context) return <div>No context found</div>;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
    } else {
      const newBooking = {
        id: currentUser?.id,
        name: currentUser?.name,
        tel: formData.tel,
        date: formData.date,
      };
      alert("Booked");
    }
  };

  return (
    <div className="border p-4 rounded shadow-md space-y-2">
      <h3 className="font-semibold text-lg mb-2">My bookings</h3>
      <button
        onClick={() => setShowBookingForm(true)}
        className="border bg-blue-500 rounded px-1 hover:bg-green-500"
      >
        {!showBookingForm && "Book"}
      </button>
      {showBookingForm && bookings.length === 0 && (
        <form onSubmit={handleSubmit} className="grid grid-rows-1">
          <input
            type="number"
            name="tel"
            required
            value={formData.tel}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="phone no."
            className="bg-white max-w-sm text-black"
          />
          <DateInput
            isRequired
            className="max-w-sm"
            label={"Appointment Date"}
            onChange={(value) =>
              setFormData({ ...formData, date: value?.toString() ?? "" })
            }
          />

          <div className="grid grid-cols-2 max-w-sm gap-4">
            <button
              type="submit"
              className="border bg-green-500 rounded max-w-3xs"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowBookingForm(false)}
              className="border bg-red-500 rounded max-w-3xs"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
