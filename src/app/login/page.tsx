"use client";

import { useAppContext } from "@/context/AppContext";
import { users } from "@/lib/mockData";
import { div } from "framer-motion/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setCurrentUser } = useAppContext();
  const router = useRouter();

  const handleLogin = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      router.push("/feed");
    }
  };

  return (
    <div className="p-2">
      <p className="text-gray-500">Choose one for login as: </p>
      {users.map((u) => (
        <div key={u.id} className="py-2">
          <button key={u.id} onClick={() => handleLogin(u.id)} className=" bg-white p-1 rounded-xl shadow-lg hover:scale-120">
          <p className="gap-5">  {u.name}</p>
        </button>
        </div>
      ))}
    </div>
  );
}
