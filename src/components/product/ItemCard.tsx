'use client'

import { useAppContext } from '@/context/AppContext'
import { listings } from '@/lib/mockData'
import { useRouter } from 'next/navigation'

export default function ItemCard({itemId}:{itemId: number} ) {
    const {items} = useAppContext()
    const router = useRouter()

    const listingId = listings.find((l) => l.authorId === itemId)
    const item = items.filter((i) => i.listingId === listingId?.id)

  return (
    <div className="pt-2 ">
      <ul className="grid grid-cols-1 md:grid-cols-2 space-x-4">
      {item.map((i) => (
        <li key={i.id} onClick={() => router.push(`/detail/service/${i.id}`)} className="pt-2 max-w-96 hover:scale-110">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex justify-between">
          <h2 className="font-semibold">{i.name}</h2>
          <p className="self-end">{i.price} $/hr</p>
        </div>
        <p>{i.description}</p>
        </div>
      </li>
      ))}
      </ul>
    </div>
  )
}
