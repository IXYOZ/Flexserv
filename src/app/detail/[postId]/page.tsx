"use client";
import { useParams } from "next/navigation";
import { posts, users as users, listings, services } from "@/lib/mockData";
import ProfileCard from "@/components/ProfileCard";
import Application from "@/components/Application";
import { useState } from "react";
import Booking from "@/components/Booking";
import Cart from "@/components/Cart";
import { useAppContext } from "@/context/AppContext";

export default function DetailPage() {
  const { postId } = useParams();
  const context = useAppContext();

  const { addBooking, currentUser } = context;

  const [showApplication, setShowApplication] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [qty, setQty] = useState(1);

  // find post
  const post = posts.find((p) => p.id === Number(postId));
  if (!post) return <div>Not found</div>;

  // find author
  const author = users.find((u) => u.id === post.authorId);

  const item = services.find((s) => s.id === selectedServiceId);

  // type service, find shop + services
  let relatedShop: (typeof listings)[0] | undefined;
  let relatedServices = [] as typeof services;
  if (post.type) {
    relatedShop = listings.find((s) => s.authorId === post.authorId);
    if (relatedShop) {
      relatedServices = services.filter((s) => s.listingId === relatedShop?.id);
    }
  }

  return (
    <div className="p-4 lg:grid grid-cols-3 gap-4 md:grid-rows-2">
      {/* Left col: Post / Job / service detail */}
      <div className="col-span-2 border rounded p-4 shadow">
        {/* <div className=" flex items-center gap3 mb-4">
                    <img src={author?.avatar} alt={author?.name} className="w-12 h-12 rounded-full"/>
                    <h2 className="font-bold text-lg">{author?.name}</h2>
                </div> */}
        <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.content}</p>

        {post.type && relatedShop && (
          <div>
            <h4 className="font-semibold text-lg mb-2">
              Shop: {relatedShop.name}
            </h4>
            <p className="text-gray-600 mb-2">{relatedShop.description}</p>

            <h5 className="font-semibold mt-4 mb-2">
              {post.type === "item" ? "item" : "Services"}
            </h5>
            <ul className="space-y-2">
              {relatedServices.map((s) => (
                <li
                  key={s.id}
                  onClick={() => {
                    if (!currentUser) {
                      alert("please login first");
                      return;
                    }
                    setSelectedServiceId(s.id);
                    addBooking({
                      id: Date.now(),
                      userId: currentUser.id,
                      serviceId: s.id,
                      datetime: new Date().toISOString(),
                      note: `Booking for ${s.name}`,
                    });
                  }}
                  className="border p-2 rounded hover:text-black hover:bg-white"
                >
                  {s.name} - {s.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Summary /Actions /Cart */}
      <div className="">
        {showApplication && (
          <Application
            postId={post.id}
            serviceId={relatedServices[0]?.id}
            onClose={() => setShowApplication(false)}
          />
        )}
        {post.type === "job" && !showApplication && (
          <button
            onClick={() => {
              setShowApplication(true);
            }}
            className="bg-blue-500 text-white py-2 px-1 rounded hover:bg-blue-600"
          >
            Apply
          </button>
        )}
        {post.type === "service" && selectedServiceId && (
          <div>
            <Booking postId={post.id} serviceId={selectedServiceId} />
          </div>
        )}
        {post.type === "item" && item && (
          <div className="space-x-2 py-3">
            <h2>{item.name}</h2>
            <p>{post.content}</p>
            <div className="py-4">
              <label className="mr-2"> Price: {item.price}</label>
              <input
                type="number"
                min={2}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="bg-white text-black text-center w-8 border rounded"
              />
              ea
            </div>
            <p className="font-semibold">Total: {item.price*qty}</p>
            <button className="border bg-green-500 rounded px-1">
              Add to cart
            </button>
            <button className="broder bg-blue-500 rounded px-1">Buy</button>
          </div>
        )}
      </div>
      <div>
        <ProfileCard />
      </div>
    </div>
  );
}
