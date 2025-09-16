"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import Navbar from "@/components/layout/Navbar";
import { users } from "@/lib/mockData";
import { items as mockItems } from "@/lib/mockData";
import { jobs as mockJobs } from "@/lib/mockData";
import { services as mockServices } from "@/lib/mockData";

type User = (typeof users)[number]

//provider

type CreateItem ={
  id: number
  listingId: number
  name: string
  price: number
  description: string
  status?: string | null
}

type CreateJobs = {
  id: number
  listingId: number
  title: string
  salary: number
  location: string
  description: string
  status?: string | null
}

type CreateServices = {
  id: number
  listingId: number
  name: string
  price: number
  description: string
  status?: string | null
}
  //location : string
  //openDate-closeDate
  //period: string


//user
type CartItem = {
  id: string
  userId: number;
  itemId: number;
  listingId: number
  userName: string
  itemName: string;
  price: number;
  quantity: number;
  datetime: string;
  
};

type OrderItem = {
  orderId: string
  userId: number
  listingId: number
  items: CartItem[]
  status: "pending" | "approved" | "cancelled" | "complete"
  datetime: string
}

type BookingItem = {
  id: number;
  userId: number;
  listingId: number
  userName: string
  phone: string
  serviceId: number;
  datetime: string;
  note?: string;
  status: "pending" | "approved" | "cancelled" | "complete"
};

type ApplicationItem = {
  id: number;
  userId: number;
  serviceId: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  coverLetter: string
  resume: string;
  createAt: string;
  status: "pending" | "approved" | "rejected"
};




//Context type

type AppContextType = {
  currentUser: User | null;
  setCurrentUser: (uesr: (typeof users)[number]| null) => void;

  //provider
  items: CreateItem[]
  addItem:(item: CreateItem) => void
  updateItem:(id: number, updateItem: Partial<CreateItem>) => void
  removeItem:(id: number) => void

  jobs: CreateJobs[]
  addJob:(job: CreateJobs) => void
  updateJob:(id: number, updateJob: Partial<CreateJobs>) => void
  removeJob: (id: number) => void

  services: CreateServices[]
  addService: (service: CreateServices) => void
  updateService: (id: number, updateService: Partial<CreateServices>) => void
  removeService: (id: number) => void


  //user
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  orderItem: OrderItem[]
  createOrder: (cartItem: CartItem[], userId: number, listingId: number) => void
  updateOrderStatus: (id: string , status: OrderItem["status"]) => void

  bookings: BookingItem[];
  addBooking: (book: BookingItem) => void;
  updateBookingStatus: (bookingId: number, status: BookingItem['status']) => void
  removeBooking: (id: number) => void;

  applications: ApplicationItem[];
  applyApplication: (app: ApplicationItem) => void;
  removeApplication: (id: number) => void;


};

//Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

//Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    null
  );

  const [items, setItems] = useState<CreateItem[]>(mockItems)
  const [jobs, setJobs] = useState<CreateJobs[]>(mockJobs)
  const [services, setServices] = useState<CreateServices[]>(mockServices)

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderItem, setOrderItem] = useState<OrderItem[]>([])
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  
  //item
  const addItem = (item: CreateItem) => {
    setItems((prev) => [...prev,item])
  }
  const updateItem = (id: number, updateItem: Partial<CreateItem>) => {
    setItems((prev) => 
    prev.map((item) => (item.id === id? {...item, ...updateItem}: item)))
  }
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  

  //Job
  const addJob = (job: CreateJobs) => {
    setJobs((prev) => [...prev, job])
  }
  const updateJob = (id: number, updateJob: Partial<CreateJobs>) => {
    setJobs((prev) =>
    prev.map((job) => job.id === id? {...job, ...updateJob}: job))
  }
  const removeJob = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }

  //Service
  const addService = (service: CreateServices) => {
    setServices((prev) => [...prev, service])
  }
  const updateService = (id: number, updateService: Partial<CreateServices>) =>{
    setServices((prev) =>
    prev.map((service) => service.id === id? {...service,updateService}: service))
  }
  const removeService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

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

  const updateItemQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  //OrderItem
  const createOrder = (cartItems: CartItem[], userId: number, listingId: number)=>{
    const newOder: OrderItem ={
      orderId: Date.now().toString(),
      userId,
      listingId,
      items: cartItems,
      status:"pending",
      datetime: new Date().toISOString()
    }
    setOrderItem(prev => [...prev, newOder])

    // setCart(prev => prev.filter(c => !cartItems.some(ci => ci.id === c.id)))
  }

  const updateOrderStatus = (orderId: string, status: OrderItem["status"]) => {
    setOrderItem((prev) =>
      prev.map((order) =>
        order.orderId === orderId? {...order, status: status} : order
      )
    )
  }
  const updateBookingStatus = (bookingId: number, status: BookingItem["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => booking.id === bookingId? {...booking, status: status} :booking
      )
    )
  }


  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((s) => s.id !== id));
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

  const removeApplication = (id: number) => {
    setApplications((prev) => prev.filter((s) => s.serviceId !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        ////////////////
        items,
        addItem,
        updateItem,
        removeItem,
        ////////////////
        jobs,
        addJob,
        updateJob,
        removeJob,
        ////////////////
        services,
        addService,
        updateService,
        removeService,
        ////////////////
        cart,
        addToCart,
        updateItemQty,
        removeFromCart,
        orderItem,
        createOrder,
        updateOrderStatus,
        updateBookingStatus,
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
