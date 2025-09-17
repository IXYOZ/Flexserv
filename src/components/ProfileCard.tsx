import Link from "next/link"
import { users as users, listings, services, posts } from "@/lib/mockData"
import { useParams,useSearchParams } from "next/navigation"
import { useAppContext } from "@/context/AppContext"





export default function ProfileCard( {authorId}:{authorId: number}) {

  const author = users.find((u) => u.id === authorId)
  const listing = listings.find((l) => l.authorId === author?.id)

  if(!author) return <div>User not found</div>
  return (
    <Link
            href={`/profile/${author.id}`}
            className="block rounded shadow bg-gray-200 hover:shadow-lg transition border p-4"
          >
            <div className="flex justify-between items-start p-4 rounded bg-gray-300 shadow hover:shadow-lg transition">
              <div className="rounded">
                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full text-gray-600 mb-2"/>
                <h1 className="font-semibold text-gray-600 text-lg">{author.name}</h1>
                {listing &&<p className="text-gray-600">{listing.name}</p>}
              </div>
              
              <p className="text-yellow-500">Rating: {author.rate}</p>
              </div>
          </Link>
  )
}
