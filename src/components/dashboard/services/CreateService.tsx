"use client";

import { useAppContext } from "@/context/AppContext";
import { listings } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateService({onClose} : {onClose: () => void}) {
  const { currentUser, addService } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const listing = listings.find((lt) => lt.authorId === currentUser?.id);
  if (!listing) {
    alert("Please login");
    router.push("/login");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>({
        ...prev,
        [name]: value
    }))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addService({
        id: Math.floor(Math.random()*1000),
        listingId: Number(listing.id),
        name: formData.name,
        price: Number(formData.price),
        description: formData.description
    })
    setFormData({name: "", price: "", description: ""})
    onClose()
  };

  return (
    <div className="pt-2">
      <div>
        <h2>Create new service</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 max-w">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 pb-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border bg-white px-2"
              placeholder="Name"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border bg-white px-2"
              placeholder="Price/hr"
              required
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border bg-white px-2"
            placeholder="Description"
            required
          />
          <div className="flex justify-center space-x-2 p-2">
            <button type="submit" className="border bg-white rounded p-1 hover:bg-green-500 hover:text-white">Confirm</button>
            <button onClick={() => onClose()} className="border bg-white rounded p-1 hover:bg-red-500 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
