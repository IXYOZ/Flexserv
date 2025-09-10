"use client";

import { useAppContext } from "@/context/AppContext";
import { listings, users } from "@/lib/mockData";
import { useState } from "react";
import CreateService from "./CreateService";

export default function Services() {
  const { currentUser, services, updateService, removeService } =
    useAppContext();
  const [showFormService, setShowFormService] = useState(false);

  const serviceWithAuthor = services.map((service) => {
    const listing = listings.find((l) => l.id === service.listingId);
    const author = users.find((u) => u.id === listing?.authorId);
    return {
      ...service,
      authorId: author?.id,
      authorName: author?.name,
    };
  });

  const listService = serviceWithAuthor.filter(
    (sa) => sa.authorId === currentUser?.id
  );

  return (
    <div className="p-2">
      <button
        onClick={() => setShowFormService(!showFormService)}
        className="border bg-white px-2 py-1 rounded hover:bg-green-500 hover:text-white"
      >
        +
      </button>
      {showFormService && (
        <CreateService onClose={() => setShowFormService(false)} />
      )}
      <div className="pt-2">
        <ul>
          {listService.map((ls) => (
            <li
              key={`${ls.id}-${ls.authorId}`}
              className="grid grid-cols-2 gap-8 border-1 sm:grid-cols-2 border-black p-2 rounded"
            >
              <div className="grid grid-cols-2">
                <div className="grid grid-rows-2">
                  <span className="font-semibold">{ls.name}</span>
                  <span>{ls.description}</span>
                </div>
                <div className="flex justify-center items-center">
                  <span>: {ls.price}$/hr</span>
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
