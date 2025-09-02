'use client'

import {AppContext} from "@/context/AppContext"
import { useContext } from "react";
import Link from "next/link";

export default function PaymentPage(){
    const context = useContext(AppContext)
    if(!context) return <div>No Booking Context Found</div>

    const {selectedServices, removeService} = context
    const total = selectedServices.reduce((sum,s) => sum+s.price,0)

    if(selectedServices.length === 0){
        return <div className="p-4">No Services selected</div>
    }

    const shopId = selectedServices[0].shopId

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>

            <ul className="space-y-2">
                {selectedServices.map((s) =>(
                    <li key={s.id} className="flex justify-between">
                        <span>{s.name}</span>
                        <span>{s.price}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-4 font-bold text-right">Total: ${total}</div>
            <div className="text-center space-x-4">
                <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Confirm Payment</button>
                <Link href={`/profile/${shopId}`}>
                    <button className="mt-6 bg-white text-black px-4 py-2 rounded hover:bggra300">Back</button>
                </Link>        
            </div>
        </div>
    )

}