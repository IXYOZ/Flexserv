import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";

interface ApplicationProps {
  jobId: number;
  serviceId?: number;
  onClose: () => void
}
export default function Application({ jobId, serviceId, onClose }: ApplicationProps) {
  const context = useAppContext();
  if (!context) return <div>No applications context found</div>;

  const { applications, applyApplication, removeApplication, currentUser } =
    context;

  //const appId = applications.find((a) => a.id === postId);
  //if(!appId)  return <div>No Application</div>

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle data...
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //safe refresh
    if (!currentUser) return alert("please login frist");
    const newApplication = {
      id: Number(Date.now()), //generate id
      createAt: new Date().toISOString(),
      userId: currentUser.id,
      jobId,
      serviceId: Number(serviceId),
      ...formData,
    };
    applyApplication(newApplication);
    alert("Applied successfully");
    setFormData({ name: "", email: "", phone: "", resume: "" });
    onClose()
  };

  const handleCancel = () =>{
    setFormData({name: "", email: "", phone: "", resume: ""})
    onClose()
  }

  return (
    <div>
      <h2 className="text-black ">Application Form</h2>
      <form onSubmit={handleSubmit}  className="py-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-1 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-1 rounded w-full"
          required
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-1 rounded w-full"
          required
        />
        <input
          type="text"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          className="border p-1 rounded w-full"
          required
        />

        <div className="flex items-center pt-2">
          <div className="flex justify-between space-x-2">
            <button type="submit" className="border bg-green-400 rounded px-1">
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border bg-red-400 rounded px-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
