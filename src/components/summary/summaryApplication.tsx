'use client'

import { useAppContext } from '@/context/AppContext'

export default function SummaryApplication() {
const context = useAppContext()

const {currentUser, applications} = context
if(!currentUser) return <div>Please login to see your applications.</div>

const myApplication = applications.filter(app => app.userId === currentUser?.id)
  return (
    <div >
      <div className='bg-blue-400 rounded'>

        {myApplication && myApplication.length > 0 ?(
          applications.map((item, index) =>(
          <div key={item.id} className='grid grid-rows-1 p-2'>
            <span className='text-black'>{item.name}</span>
            <span className='text-black'>{item.email}</span>
            <span className='text-black'>{item.phone}</span>
            <span className='text-black'>{item.coverLetter}</span>
            <span className='text-black'>{item.resume}</span>
          </div>
          ))
        ):(
          <p className='text-black'>No Application found.</p>
        )}
      </div>
    </div>
  )
}
