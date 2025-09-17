"use client";

import { useAppContext } from "@/context/AppContext";
import { listings } from "@/lib/mockData";
import { useRouter } from "next/navigation";


export default function ServiceCard({ listingId }: { listingId: number }) {
  const { services } = useAppContext();
  const router = useRouter()

  const listing = listings.find((f) => f.authorId === listingId);
  const service = services.filter((s) => s.listingId === listing?.id);

  return (
    <div className="pt-2 ">
      <ul className="grid grid-cols-1 md:grid-cols-2 space-x-4">
      {service.map((s) => (
        <li key={s.id} onClick={() => router.push(`/detail/service/${s.id}`)} className="pt-2 max-w-96 hover:scale-110">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex justify-between">
          <h2 className="font-semibold">{s.name}</h2>
          <p className="self-end">{s.price} $/hr</p>
        </div>
        <p>{s.description}</p>
        </div>
      </li>
      ))}
      </ul>
    </div>
  );
}
