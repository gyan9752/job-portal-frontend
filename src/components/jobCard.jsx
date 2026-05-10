import { useState } from "react";
import API from "../services/api";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";

const JobCard = ({ job }) => {
  const [isApplying, setIsApplying] = useState(false);

  const applyJob = async () => {
    if (isApplying) return;

    setIsApplying(true);
    try {
      await API.post(`/Jobs/${job._id}/apply`);
      alert("Applied Successfully ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="
        w-full flex flex-col justify-between
        bg-white rounded-2xl shadow-md border border-gray-200
        p-6
        hover:shadow-xl transition-all duration-300
      ">

        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BriefcaseIcon className="text-white" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {job.title}
              </h2>
              <p className="text-gray-600 truncate">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <MapPinIcon className="text-sm" />
            <span className="text-sm">{job.location}</span>
          </div>

          <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {job.jobType}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={applyJob}
          disabled={isApplying}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700"
        >
          {isApplying ? "Applying..." : "Apply Now"}
        </button>

      </div>
    </div>
  );
};

export default JobCard;