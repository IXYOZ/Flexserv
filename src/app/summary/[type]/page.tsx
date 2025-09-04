"use client";

import SummaryCart from "@/components/summary/SummaryCart";
import { useState } from "react";
import SummaryBooking from "@/components/summary/summaryBooking";
import SummaryApplication from "@/components/summary/summaryApplication";
import { useParams } from "next/navigation";

export default function SummaryPage() {
  const params = useParams()
  const type = params?.type || "cart"

  
  const [activeType, setActiveType] = useState(type)
  


  return (
    <div className="bg-gray-200 rounded-2xl min-h-lvw">
      <div className="p-2">
        <div>
          <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white space-x-2">
            <li>
              <button 
                      onClick={() => setActiveType("cart")}
              className={activeType === "cart"? "bg-amber-500 rounded px-2":"px-3 py-1"}
                >
                <p>Cart</p>
              </button>
            </li>
            <li>
              <button 
              onClick={() => setActiveType("booking")}
              className={activeType==="booking"?"bg-green-500 rounded px-2":"px-3 py-1"}>
                <p>Book</p>
              </button>
            </li>
            <li>
              <button 
              onClick={() => setActiveType("application")}
              className={activeType === "application"?"bg-blue-500 rounded px-2":"px-3 py-1"}>
                <p>Application</p>
              </button>
            </li>
          </ul>
          <div>
            {activeType === "cart"&& <SummaryCart/>}
            {activeType === "booking"&& <SummaryBooking/>}
            {activeType === "application"&& <SummaryApplication/>}
          </div>
        </div>
      </div>
    </div>
  );
}
