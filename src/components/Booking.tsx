import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";
import { DateInput } from "@heroui/date-input";
import { useRouter,useParams } from "next/navigation";

interface BookingProps {
  postId: number;
  serviceId?: number;
}

export default function Booking({ postId }: BookingProps) {
  const context = useAppContext();
  const router = useRouter();
  const params = useParams()

  const {id} = params

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    note:"",
    date: "",
  });

  const { bookings,addBooking, removeBooking, currentUser } = context;
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
        id: Number(Date.now),
        userId: currentUser?.id,
        userName: currentUser?.name,
        phone: currentUser?.phone,
        serviceId: Number(id),
        datetime: formData.date,
        note: formData.note
      };
      addBooking(newBooking)
      alert("Booked");
      router.push('/summary?initialType=booking')
    }
  };

  const handleBook =() =>{
    if(!currentUser){
      router.push('/login')
      alert("Please login")
    }
    setShowBookingForm(true)
  }

  return (
    <div className="border p-4 rounded shadow-md space-y-2">
      <h3 className="font-semibold text-lg mb-2 text-black">Make bookings</h3>
      <button
        onClick={handleBook}
        className="border bg-blue-500 rounded px-1 hover:bg-green-500"
      >
        {!showBookingForm && "Book"}
      </button>
      {showBookingForm && bookings.length >= 0 && (
        <form  onSubmit={handleSubmit} className="grid grid-rows-1 gap-2">
          <input
            type="text"
            name="phone"
            disabled
            value={currentUser?.phone}
            pattern="[0-9]{10}"
            placeholder="phone no."
            className="bg-white max-w-sm text-black border"
          />
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Wanna say something"
            className="bg-white max-w-sm text-black border"
          />
          <h3 className="text-amber-400 pt-5">Appointment date:</h3>
          <DateInput
            isRequired
            className="text-black border py-4"
            onChange={(value) =>
              setFormData({ ...formData, date: value?.toString() ?? "" })
            }
          />

          <div className="grid grid-cols-2 max-w-sm gap-4 pt-2">
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
