'use client'

import { useAppContext } from "@/context/AppContext"
import { listings } from "@/lib/mockData"
import { useRouter } from "next/navigation"


export default function JobCard({listingId}:{listingId : number}) {
    const {jobs} = useAppContext()
    const router = useRouter()

    const listing = listings.find((l) => l.authorId === listingId)
    const job = jobs.filter((j) => j.listingId === listing?.id)
  return (
    <div className="pt-2 ">
      <ul className="grid grid-cols-1 md:grid-cols-2 space-x-4">
      {job.map((j) => (
        <li key={j.id} onClick={() => router.push(`/detail/job/${j.id}`)} className="pt-2 max-w-96 hover:scale-110">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex justify-between">
          <h2 className="font-semibold">{j.title}</h2>
          <p className="self-end">{j.salary} $/hr</p>
        </div>
            <p>Location: {j.location}</p>
        </div>
      </li>
      ))}
      </ul>
    </div>
  )
}
