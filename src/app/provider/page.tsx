"use client";

import Items from "@/components/dashboard/items/Items";
import Jobs from "@/components/dashboard/jobs/Jobs";
import Services from "@/components/dashboard/services/Services"
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProviderPage() {
  const context = useAppContext();

  const { currentUser } = context;

  const router = useRouter();

  const [type, setType] = useState("");

  const [selectedBtn, setSelectedBtn] = useState()


  useEffect(() => {
    if(!currentUser) return router.push('/login')
    if (currentUser.type !== "provider") {
      alert("Please change your type to provider");
      router.push("/setting");
    }
  }, [currentUser, router]);

  const handleSelected = () => {

  }

  return (
    <div className="h-24">
      <div className="flex justify-center text-center ">
        <h1 className="px-1 font-semibold items-center">Dashboard</h1>
      </div>
      <div className="flex  p-1 space-x-2 justify-center">
        <div className="grid grid-cols-3 gap-2">
        <button
            onClick={() => setType("items")}
            className={`border text-black p-1  rounded ${type === "items" && "bg-amber-500 text-white px-4 py-1"}`}
          >
            Items
          </button>
          <button
            onClick={() => setType("services")}
            className={`border text-black p-1  rounded ${type === "services" && "bg-green-500 text-white px-4 py-1"}`}
          >
            services
          </button>
          <button
            onClick={() => setType("jobs")}
            className={`border text-black p-1 rounded ${type === "jobs" && "bg-blue-500 text-white px-4 py-1"}`}
          >
            Jobs
          </button>
        </div>
      </div>
      <div className="px-1">{type === "items" && <Items/>}</div>
      <div className="px-1">{type === "services" && <Services/>}</div>
      <div className="px-1">{type === "jobs" && <Jobs/>}</div>
    </div>
  );
}
