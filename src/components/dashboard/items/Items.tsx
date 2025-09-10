"use client";

import { useAppContext } from "@/context/AppContext";
import { listings, users } from "@/lib/mockData";
import CreateItem from "./CreateItem";
import { useState } from "react";

export default function Items() {
  const context = useAppContext();
  const { currentUser, items, updateItem, removeItem } = context;

  const [showFormItem, setShowFormItem] = useState(false)

  const itemWithAuthor = items.map((item) => {
    const listing = listings.find((l) => l.id === item.listingId);
    const author = users.find((u) => u.id === listing?.authorId);
    return {
      ...item,
      authorName: author?.name,
      authorId: author?.id,
    };
  });


  const listItems = itemWithAuthor.filter(
    (ia) => ia.authorId === currentUser?.id
  );

  return (
    <div className="p-2">
      <button onClick={() => setShowFormItem(!showFormItem)} className="border bg-white px-2 py-1 rounded">+</button>
      {showFormItem&&(
        <CreateItem onClose= {() => setShowFormItem(false)}/>
      )}
      <div className="pt-2">
        <ul>
          {listItems.map((li) => (
            <li
              key={`${li?.id}-${li?.authorId}`}
              className="grid grid-cols-2 gap-8 border-1 sm:grid-cols-2 border-black p-2 rounded"
            >
              <div className="grid grid-cols-2">
                <div className="grid grid-rows-2">
                  <span className="font-semibold">{li.name}</span>
                  <span>{li.description}</span>
                </div>
                <div className="flex justify-center items-center">
                  <span>: {li.price}$</span>
                </div>
              </div>
              <div className="flex space-x-2 justify-end items-center">
                <button className="border bg-white text-black rounded p-0.5">
                  Edit
                </button>
                <button className="border bg-white text-red-500 rounded p-0.5">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
