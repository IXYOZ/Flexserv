"use client";

import { users, listings, services } from "@/lib/mockData";
import { useParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";

export default function ProfilePage() {
  const { userId } = useParams();

  const user = users.find((u) => u.id === Number(userId));
  if (!user) return <div>User not found</div>;

  const shop = listings.find((s) => s.authorId === user.id);

  //filter service by shop
  const shopServices = services.filter((s) => s.id === shop?.id);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 py-3">
        <div className="flex space-x-4">
          <img src={user.avatar} alt={user.name} />
          <h2>{user.name}</h2>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-center">Follower</p>
        </div>
      </div>
      <p>{user.bio}</p>

      {shop && (
        <>
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <div className=" grid grid-cols-2 gap-4">
            {shopServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
