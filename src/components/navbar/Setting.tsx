"use client";

import { useAppContext } from "@/context/AppContext";
import DropDown from "../DropDown";
import { useRouter } from "next/navigation";

export default function Setting() {
  const context = useAppContext();
  const router = useRouter();

  const { currentUser } = context;
  if(!currentUser) return 
  

  return (
    <div >
      <DropDown
        label="S"
        options={["Profile","Type : "+currentUser?.type, "Account setting", "Manage product"]}
        onSelect={(value) => {
          switch (value) {
            case "Profile":
              router.push(`profile/${currentUser?.id}`);
              break;
            case 'Account setting':
                router.push(`/setting`)
                break
            case 'Manage product':
                router.push(`/provider`)
                break

          }
        }}
      />
    </div>
  );
}
