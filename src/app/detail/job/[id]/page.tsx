"use client";

import Application from "@/components/Application";
import { useAppContext } from "@/context/AppContext";
import { jobs } from "@/lib/mockData";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function JobDetailPage() {
  const { id } = useParams();
  const context = useAppContext();
  const [showApplication, setShowApplication] = useState(false);

  //const { applications, applyApplication, removeApplication } = context;

  const job = jobs.find((j) => j.id === Number(id));
  console.log(job?.id);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-black">{job?.title}</h1>
            <p className="text-black">{job?.description} </p>

            <button
              onClick={() => setShowApplication(true)}
              className="border bg-blue-500 rounded px-1"
            >
              {!showApplication && "Apply"}
            </button>
          </div>
          {showApplication && (
            <div>
              {job && (
                <Application
                  jobId={job?.id}
                  onClose={() => setShowApplication(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
