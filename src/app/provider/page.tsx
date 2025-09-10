"use client";

import Items from "@/components/dashboard/items/Items";
import Jobs from "@/components/dashboard/jobs/Jobs";
import Services from "@/components/dashboard/services/Services";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProviderPage() {
  const context = useAppContext();

  const { currentUser } = context;

  const router = useRouter();

  const [type, setType] = useState("");

  const [selectedBtn, setSelectedBtn] = useState();

  useEffect(() => {
    if (!currentUser) return router.push("/login");
    if (currentUser.type !== "provider") {
      alert("Please change your type to provider");
      router.push("/setting");
    }
  }, [currentUser, router]);


  return (
    <div className="h-lvw bg-white">
      <div className="flex justify-center text-center p-4 ">
        <h1 className="px-1 text-xl font-semibold items-center bg-gradient-to-r form-black via-gray-400">Dashboard</h1>
      </div>
      <div className="flex  p-1 space-x-2 justify-center">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              title: "items",
              style: "bg-amber-600 text-white scale-105"
            },
            {
              title: "services",
              style: "bg-green-600 text-white scale-105"
              
            },
            {
              title: "jobs",
              style: "bg-blue-600 text-white scale-105"
              
            },
          ].map((f, i) => (
            <button
              key={i}
              onClick={() => setType(f.title)}
              className={`p-2 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 ${type === f.title && f.style}`} 
            >
              <p className="text-l font-semibold mb-2">{f.title}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="px-1">{type === "items" && <Items />}</div>
      <div className="px-1">{type === "services" && <Services />}</div>
      <div className="px-1">{type === "jobs" && <Jobs />}</div>
    </div>
  );
}
