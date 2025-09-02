'use client'

import {useAppContext} from "@/context/AppContext"
import { useContext } from "react";
import Link from "next/link";

export default function PaymentPage(){
    const context = useAppContext()
    if(!context) return <div>No Booking Context Found</div>

    const {cart, bookings, applications} = context
    


}