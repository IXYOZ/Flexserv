import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Noti from "../navbar/NotiDropDown";
import { useState } from "react";
import "@tailwindplus/elements";
import Setting from "../navbar/Setting";

export default function Navbar() {
  const { currentUser, cart, bookings, applications } = useAppContext();

  return (
    <nav className="bg-white shadow p-2 flex justify-between items-center sticky top-0 h-15 w-full z-50">
      <div className="flex items-center space-x-4">
        <Link href="/feed">
          <h1 className="font-bold text-lg text-blue-600 hover:scale-110">
            FlexServ
          </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser ? (
          <Link
            href={`/profile/${currentUser.id}`}
            className="text-blue-500 hover:underline hover:font-semibold hover:scale-105"
          >
            {currentUser.name}
          </Link>
        ) : (
          <Link href="/login" className="text-blue-500 hover:underline">
            Guest
          </Link>
        )}
        {currentUser && (
          <div className="flex space-x-2">
            
              <div className="flex justify-center items-center hover:scale-110">
                <Noti />
              </div>
            
            {currentUser && (
              <div>
                <Setting />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
