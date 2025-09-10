'use client'

import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Account() {

    const context = useAppContext()
    const router = useRouter()

    const {currentUser,setCurrentUser} = context




    useEffect(() =>{
        if(!currentUser){
            router.push('/login')
        }
    },[currentUser])

const handleChange =(type: "user" | "provider") => {
    setCurrentUser({
        ...currentUser!,
        type,
    })
}


  return (
    <div >
        <div >
            <h2 className="font-semibold">Manage user type</h2>
            <span className="font-semibold">Type</span>
            <div className="flex space-x-2">
               <label >
                <input type="radio" name="userType" checked={currentUser?.type ==="user"} onChange={() => handleChange("user")} />
                <span>User</span>
               </label>
               <label >
                <input type="radio" name="userType" checked={currentUser?.type ==="provider"} onChange={() => handleChange("provider")} />
                <span>Provider</span>
               </label>
            </div>
        </div>
    </div>
  )
}
