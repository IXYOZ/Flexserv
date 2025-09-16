"use client";

import { useAppContext } from "@/context/AppContext";
import { posts, users } from "@/lib/mockData";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  author: string;
  title: string;
  type: string;
  content: string;
  avatar: string;
};


export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const {currentUser} = useAppContext()

  const postId = posts.find(p => p.id === post.id)
  const profileId = users.find(u => u.id === postId?.authorId)

  return (
    <div
      className="rounded-xl bg-blue-300 hover:shadow-md gap-4"
    >
      <div className="flex items-center bg-blue-500 rounded-t-2xl gap-4">
        <div className=" p-2 flex gap-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-10 h-10 rounded-full"
        />
        <h3 className="font-semibold hover:underline cursor-pointer" onClick={() => router.push(`/profile/${profileId?.id}`)}>{post.author}</h3>
        </div>
      </div>
      <div className="w-full rounded px-2 pb-3 pt-2">
        <h2 >{post.title}</h2>
        <p className="border-t mt-2 text-sm ">{post.content}</p>
        <div className="pt-5">
            <div className="bg-white h-134">
              Images
            </div>
            <div className="cursor-pointer pt-1" onClick={() => router.push(`/detail/${post.type}/${postId?.id}`)}>
              <span className="hover:font-semibold">More details</span>
            </div>
        </div>
      </div>
    </div>
  );
}
