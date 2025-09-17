"use client";

import Cart from "@/components/Cart";
import ProfileCard from "@/components/ProfileCard";
import { useAppContext } from "@/context/AppContext";
import { listings } from "@/lib/mockData";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ItemDetailPage() {
  const { id} = useParams<{id: string}>();
  const {items} = useAppContext()

  const product = items.find((i) => i.id === Number(id));
  if (!product) return <div>No item</div>;

  const listing = listings.find(l => l.id === product.listingId)

  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 rounded p-2">
        <div className="bg-gray-400 rounded p-2">
          <Cart />
        </div>
      </div>
      <div className="py-5 max-w-4xl">
       {listing&& <ProfileCard authorId = {listing?.authorId} />}
        
      </div>
    </div>
  );
}
