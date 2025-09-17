"use client";

import Booking from "@/components/Booking";
import ProfileCard from "@/components/ProfileCard";
import { useAppContext } from "@/context/AppContext";
import { listings} from "@/lib/mockData";
import { useParams } from "next/navigation";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const {services} = useAppContext()

  const product = services.find((s) => s.id === Number(id));
  if (!product) return <div>No service</div>;

  const listing = listings.find(l => l.id === product.listingId)

  return (
    <div className="flex justify-center ">
      <div className="max-w-4xl w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Booking/>
          </div>
        </div>
        <div className="py-5 max-w-4xl">
          {listing && <ProfileCard authorId={listing.authorId}/>}
        
        </div>
      </div>
    </div>
  );
}
