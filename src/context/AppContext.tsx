"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import Navbar from "@/components/Navbar";
import { users } from "@/lib/mockData";

type CartItem = {
  userId: number;
  itemId: number;
  itemName: string;
  price: number;
  quantity: number;
  datetime: string;
};

type BookingItem = {
  id: number;
  userId: number;
  serviceId: number;
  datetime: string;
  note?: string;
};

type ApplicationItem = {
  id: number;
  userId: number;
  serviceId: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  createAt: string;
};

//Context type
type AppContextType = {
  currentUser: (typeof users)[number] | null;
  setCurrentUser: (uesr: (typeof users)[number]) => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQty: (id: number, qty: number) => void;
  removeFromCart: (serviceId: number) => void;
  clearCart: () => void;

  bookings: BookingItem[];
  addBooking: (book: BookingItem) => void;
  removeBooking: (serviceId: number) => void;

  applications: ApplicationItem[];
  applyApplication: (app: ApplicationItem) => void;
  removeApplication: (serviceId: number) => void;
};

//Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

//Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<(typeof users)[number] | null>(
    null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);

  //cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) =>
          cartItem.itemId === item.itemId && cartItem.userId === item.userId
      );
      if (existingIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
          datetime: item.datetime,
        };
        return updatedCart;
      } else {
        return [...prev, item];
      }
    });
  };

  const updateItemQty = (id: number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === id ? { ...item, quantity: qty } : item
      )
    );
  };
  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((s) => s.itemId !== itemId));
  };
  const clearCart = () => setCart([]);

  //bookings
  const addBooking = (item: BookingItem) => {
    setBookings((prev) => [...prev, item]);
  };
  const removeBooking = (id: number) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  //application
  const applyApplication = (item: ApplicationItem) => {
    setApplications((prev) => [...prev, item]);
  };

  const removeApplication = (serviceId: number) => {
    setApplications((prev) => prev.filter((s) => s.serviceId !== serviceId));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cart,
        addToCart,
        updateItemQty,
        removeFromCart,
        clearCart,
        bookings,
        addBooking,
        removeBooking,
        applications,
        applyApplication,
        removeApplication,
      }}
    >
      <Navbar />
      <div className="flex justify-center bg-gray-100 min-h-lvh">
        <div className="max-w-6xl lg:max-w-4xl w-full p-4 shadow ">
          <div className="bg-gray-200 rounded">
            {children}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
}
