"use client";

import SummaryCart from "@/components/summary/SummaryCart";
import Cart from "@/components/Cart";
import React from "react";

export default function SummaryPage() {


  return (
    <div className="bg-gray-200 rounded-2xl min-h-lvw">
      <div className="p-2">
        <div>
          <SummaryCart/>
        </div>
      </div>
    </div>
  );
}
