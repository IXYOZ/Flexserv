import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ApplicationProps {
  jobId: number;
  serviceId?: number;
  onClose: () => void
}
export default function Application({ jobId, serviceId, onClose }: ApplicationProps) {
  const context = useAppContext();
  const router = useRouter()
  
  const { applications, applyApplication, removeApplication, currentUser } =
  context;
  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: "",
    });
    
    if (!context) return <div>No applications context found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle data...
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //safe refresh
    if (!currentUser) {
      router.push('/login')
      return alert("please login frist");
    }
    const newApplication = {
      ...formData,
      id: Number(Date.now()), //generate id
      createAt: new Date().toISOString(),
      userId: currentUser.id,
      jobId,
      serviceId: Number(serviceId),
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
    };
    applyApplication(newApplication);
    alert("Your infomation saved");
    setFormData({  coverLetter: "", resume: "" });
    onClose()
    router.push('/summary?initialType=application')
  };

  const handleCancel = () =>{
    setFormData({ coverLetter: "", resume: ""})
    onClose()
  }

  return (
    <div>
      <h2 className="text-black ">Application Form</h2>
      
      {}
      <form onSubmit={handleSubmit}  className="py-2">
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          rows={4}
          cols={5}
          value={formData.coverLetter}
          onChange={handleChange}
          className="border p-1 rounded w-full text-black"
          required
        />
        <textarea
          name="resume"
          placeholder="Resume"
          rows={4}
          cols={5}
          value={formData.resume}
          onChange={handleChange}
          className="border p-1 rounded w-full text-black"
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
