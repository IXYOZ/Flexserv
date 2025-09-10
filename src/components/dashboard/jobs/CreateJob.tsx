'use client'

import { useAppContext } from '@/context/AppContext'
import { listings } from '@/lib/mockData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function CreateJob({onClose}: {onClose: () => void}) {
  const router = useRouter()
  const {currentUser, addJob, updateJob, removeJob} = useAppContext()



  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    location: "",
    description:"",

  })

  const listing = listings.find((lt) => lt.authorId === currentUser?.id)
  if(!listing){
    alert("Please loin")
    router.push('/login')
    return null
  } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit =(e: React.FormEvent) => {
    e.preventDefault()
    addJob({
      id: Math.floor(Math.random()* 1000),
      listingId: Number(listing?.id),
      title: formData.title,
      salary: Number(formData.salary),
      location: formData.location,
      description: formData.description
    })
    setFormData({title: "",  salary: "", location: "", description: "",})
    onClose()
  }

  return (
    <div>
      <div className="pt-2">
      <div>
        <h2>Create new Item</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 max-w">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 pb-1">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border bg-white px-2"
              placeholder="Name"
              required
            />
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="border bg-white px-2"
              placeholder="Salary"
              required
            />
          </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border bg-white px-2"
              placeholder="Location"
              required
            />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border bg-white px-2"
            placeholder="Description"
          />
        <div className="flex justify-center space-x-2 p-2">
          <button type="submit" className="border bg-white rounded p-1 hover:bg-amber-500 hover:text-white">
            Confirm
          </button>
          <button onClick={() => onClose()} className="border bg-white rounded p-1 hover:bg-red-500 hover:text-white">
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}
