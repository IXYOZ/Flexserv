"use client";

import PostCard from "@/components/PostCard";
import { posts, users  } from "@/lib/mockData";



export default function FeedPage() {
  return (
    <div className="p-4 bg-white rounded bg-fixed">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => {
          const author = users.find(u => u.id === post.authorId)
          if(!author) return null
          
          const postWithAuthor = {
            ...post,
            author: author.name,
            avatar: author.avatar
          }

          return <PostCard key={post.id} post={postWithAuthor}/>
        })}
      </div>
    </div>
  );
}
