"use client";

import { useState } from "react";
import CreateJob from "./CreateJob";
import { useAppContext } from "@/context/AppContext";
import { listings, users } from "@/lib/mockData";

export default function Jobs() {
  const { currentUser, jobs, updateJob, removeJob } = useAppContext();
  const [showformJob, setShowFormJob] = useState(false);

  const jobsWithAuthor = jobs.map((job) => {
    const listing = listings.find((l) => l.id === job.listingId);
    const author = users.find((u) => u.id === listing?.authorId);
    return {
      ...job,
      authorId: author?.id,
      authorName: author?.name,
    };
  });

  const listJobs = jobsWithAuthor.filter((ja) => ja.authorId === currentUser?.id);

  return (
    <div className="p-2">
      <button
        onClick={() => setShowFormJob(!showformJob)}
        className="border bg-white px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
      >
        +
      </button>
      {showformJob && <CreateJob onClose={() => setShowFormJob(false)}/>}
      <div className="pt-2">
        <ul>
          {listJobs.map((lj) => (
            <li
              key={`${lj?.id}-${lj?.authorId}`}
              className="grid grid-cols-2 gap-8 border-1 sm:grid-cols-2 border-black p-2 rounded"
            >
              <div className="grid grid-cols-2">
                <div className="grid grid-rows-2">
                  <span className="font-semibold">{lj.title}</span>
                  <span>{lj.description}</span>
                </div>
                <div className="flex justify-center items-center">
                  <span>: {lj.salary}$</span>
                </div>
              </div>
              <div className="flex space-x-2 justify-end items-center">
                <button className="border bg-white text-black rounded p-0.5">
                  Edit
                </button>
                <button className="border bg-white text-red-500 rounded p-0.5">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
