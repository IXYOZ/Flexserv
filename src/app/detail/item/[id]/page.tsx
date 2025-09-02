"use client";

import Cart from "@/components/Cart";
import ProfileCard from "@/components/ProfileCard";
import { items } from "@/lib/mockData";
import { div } from "framer-motion/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const item = items.find((i) => i.id === Number(id));
  if (!item) return <div>No item</div>;
  console.log(qty);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 rounded p-2">
      <div className="p-2 text-black">Picture</div>
      <div className="bg-gray-400 rounded p-2">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <div className="grid grid-cols-2">
          <p>${item.price}</p>
        </div>
        <Cart />
      </div>

      <ProfileCard />
    </div>
  );
}
