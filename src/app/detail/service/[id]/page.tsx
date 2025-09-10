"use client";

import Booking from "@/components/Booking";
import ProfileCard from "@/components/ProfileCard";
import { services } from "@/lib/mockData";
import { useParams } from "next/navigation";

export default function ServiceDetailPage() {
  const { id } = useParams();

  const service = services.find((s) => s.id === Number(id));
  if (!service) return <div>No service</div>;

  return (
    <div className="flex justify-center ">
      <div className="max-w-4xl w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Booking postId={Number(id)} />
          </div>
        </div>
        <div className="py-5 max-w-4xl">
        <ProfileCard/>
        </div>
      </div>
    </div>
  );
}
