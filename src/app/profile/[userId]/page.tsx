"use client";

import { users, listings, services } from "@/lib/mockData";
import { useParams } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import ServiceCard from "@/components/product/ServiceCard";

export default function ProfilePage() {
  const { userId } = useParams();

  const user = users.find((u) => u.id === Number(userId));
  if (!user) return <div>User not found</div>;

  const listing = listings.find((s) => s.authorId === user.id);

  //filter service by shop

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

      {listing && (
        <>
          <h2 className="text-xl font-semibold mb-2">Listing</h2>
          <div className=" grid grid-cols-2 gap-4">
           
              <ListingCard key={listing.id} listing={listing} />
          
          </div>
        </>
      )}
      <div>
        <ServiceCard serviceId={Number(userId)}/>
      </div>
    </div>
  );
}
