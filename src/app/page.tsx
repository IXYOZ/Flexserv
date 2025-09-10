  'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter()
  return (
    <div className="p-4">
      <p>Promotion ETC... </p>
      <button onClick={() => router.push('/feed')} className="bg-white hover:bg-blue-500 hover:text-white rounded p-1">Go to feed</button>
    </div>
  );
}
