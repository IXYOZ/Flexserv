'use client'

import { useAppContext } from "@/context/AppContext"
import { items } from "@/lib/mockData"


export default function SummaryCart() {

  const context = useAppContext()

  const {currentUser,cart,updateItemQty,removeFromCart} = context

  
  


  function updateQty(id: number, qty: number) {
    if (qty < 1) qty = 1;
    updateItemQty(id, qty);
    }


  return (
    <div className="bg-gray-100 h-96 px-4 ">
      {cart.map((c)=>(
        <li
        key={c.itemId}
        className="flex justify-between items-center border-b pb-1 pt-2 item-le"
      > 
        <span className="text-black">{c.itemName}</span>
        <span className="text-black">${c.price * c.quantity} :</span>
        <div className="">
          {cart.map((c) => (
            <input
              key={c.itemId}
              value={c.quantity}
              onChange={(e) =>
                {
                  const item = items.find((i) => i.id === c.itemId)
                  if(!item) return <div>No item</div>
                  updateQty(item.id, Number(e.target.value))}
              }
              type="number"
              max={999}
              onBlur={() => {
                if (c.quantity < 1) updateItemQty(c.itemId, 1);
              }}
              className="bg-white text-black text-center max-w-8"
            />
          ))}
        </div>
        <button
          onClick={() => {
            removeFromCart(c.itemId);
          }}
          className="bg-white text-red-600 px-2 py-1 rounded hover:bg-red-200"
        >
          Remove
        </button>
      </li>
      ))}
    </div>
  )
}
