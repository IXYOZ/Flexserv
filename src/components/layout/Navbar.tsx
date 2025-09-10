import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import CartDropDown from "../navbar/CartDropDown";
import { useState } from "react";
import "@tailwindplus/elements";
import Setting from "../navbar/Setting";

export default function Navbar() {
  const { currentUser, cart, bookings, applications } = useAppContext();

  

  return (
    <nav className="bg-white shadow p-2 flex justify-between items-center sticky top-0 h-15 w-full z-50">
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
        <div className="flex space-x-2">
          <div className="flex justify-center items-center">
            <CartDropDown />
          </div>
          {currentUser && (
            <div>
              <Setting />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
