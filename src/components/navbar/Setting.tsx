"use client";

import { useAppContext } from "@/context/AppContext";
import DropDown from "../DropDown";
import { useRouter } from "next/navigation";

export default function Setting() {
  const { currentUser, setCurrentUser } = useAppContext();
  const router = useRouter();

  let type = "order"

  if(!currentUser) return 




  

  return (
    <div >
      <DropDown
        label="🔧"
        options={["Profile","Type : "+currentUser?.type, "Account setting", "Manage product", "See orders", "Logout"]}
        onSelect={(value) => {
          switch (value) {
            case "Profile":
              router.push(`/profile/${currentUser?.id}`);
              break;
            case 'Account setting':
                router.push(`/setting`)
                break
            case 'Manage product':
                router.push(`/provider`)
                break
            case 'See orders':
                router.push(`/summary/${type}`)
                break
            case 'Logout':
                setCurrentUser(null)
                router.push(`/login`)
                break

          }
        }}
      />
    </div>
  );
}
