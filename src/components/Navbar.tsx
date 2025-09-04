import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Cart from "./Cart";
import { users } from "@/lib/mockData";
import CartDropDown from "./CartDropDown";
import { useState } from "react";

export default function Navbar() {
  const { currentUser, cart, bookings , applications } = useAppContext();
  const [cartDrop, setCartDrop] = useState(false);

  
  
  const noti = cart.length+bookings.length+applications.length
  

  return (
    <nav className="bg-white shadow p-2 flex justify-between items-center sticky top-0 w-full z-50">
      <div className="flex items-center space-x-4">
        <Link href="/feed" className="font-bold text-lg text-blue-500">
          FlexServ
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser ? (
          <Link
            href={`/profile/${currentUser.id}`}
            className="text-blue-500 hover:underline"
          >
            {currentUser.name}
          </Link>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            Guest
          </Link>
        )}
        <div>
          <button
            onClick={() => 
              setCartDrop(!cartDrop)}
            className="border border-red-500 px-2 text-red-500 rounded"
          >
            {noti > 0 ? noti : 0}
          </button>
          <div>{cartDrop && <CartDropDown />}</div>
        </div>
      </div>
    </nav>
  );
}
