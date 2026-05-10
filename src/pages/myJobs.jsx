
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// const MyJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await API.get("/Jobs/all");

//         console.log("FULL RESPONSE:", res.data);

//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log("USER:", user);

//         const allJobs = res.data.jobs || [];

//         const myJobs = allJobs.filter((job) => {
//   const createdById =
//     job.createdBy?._id || job.createdBy;

//   return String(createdById) === String(user.id);
// });

//         console.log("MY JOBS:", myJobs);

//         setJobs(myJobs);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-4xl font-bold">My Jobs</h1>

//           <button
//             onClick={() => navigate("/create-job")}
//             className="bg-blue-600 text-white px-5 py-2 rounded"
//           >
//             Create Job
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-white p-6 rounded-xl shadow"
//               >
//                 <h2 className="text-2xl font-bold text-blue-700">
//                   {job.title}
//                 </h2>

//                 <p>{job.company}</p>
//                 <p>{job.location}</p>
//               </div>
//             ))
//           ) : (
//             <p>No jobs found</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyJobs;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const MyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  // FIXED
  const fetchMyJobs = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/Jobs/my-jobs");

      setJobs(res.data?.jobs || []);
    } catch (err) {
      console.log(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED
  useEffect(() => {
    const loadJobs = async () => {
      await fetchMyJobs();
    };

    loadJobs();
  }, [fetchMyJobs]);

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/Jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: CheckCircleIcon,
        };

      case "inactive":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: XCircleIcon,
        };

      case "draft":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: ClockIcon,
        };

      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: ClockIcon,
        };
    }
  };

  const filteredJobs = jobs.filter(
    (job) => (job.status || "active") === activeTab
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 border border-gray-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <BriefcaseIcon className="w-8 h-8 text-white" />
                </div>

                <div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    My Jobs
                  </h1>

                  <p className="text-lg text-gray-600 mt-2">
                    Manage all your posted jobs
                  </p>

                </div>

              </div>

              <button
                onClick={() => navigate("/create-job")}
                className="
                  px-6 py-3 rounded-2xl
                  bg-gradient-to-r from-indigo-500 to-blue-600
                  text-white font-bold
                  shadow-lg hover:scale-105
                  transition-all duration-300
                "
              >
                Create Job
              </button>

            </div>

          </div>

          {/* TABS */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3 mb-10">

            <div className="flex flex-wrap gap-3">

              {["active", "inactive", "draft"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold capitalize transition-all duration-300
                    ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {tab} (
                  {
                    jobs.filter(
                      (job) => (job.status || "active") === tab
                    ).length
                  }
                  )
                </button>
              ))}

            </div>

          </div>

          {/* LOADING */}
          {loading ? (
            <div className="space-y-6">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-8 shadow-xl animate-pulse"
                >

                  <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>

                  <div className="space-y-3">

                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>

                  </div>

                </div>
              ))}

            </div>
          ) : filteredJobs.length === 0 ? (

            /* EMPTY STATE */
            <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">

              <DocumentTextIcon className="w-28 h-28 text-gray-300 mx-auto mb-8" />

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                No {activeTab} jobs found
              </h2>

              <p className="text-xl text-gray-600 mb-10">
                Your {activeTab} jobs will appear here.
              </p>

              <button
                onClick={() => navigate("/create-job")}
                className="
                  px-8 py-4 rounded-2xl
                  bg-gradient-to-r from-indigo-500 to-blue-600
                  text-white font-bold text-lg
                  shadow-xl hover:scale-105
                  transition-all duration-300
                "
              >
                Create New Job
              </button>

            </div>

          ) : (

            /* JOB LIST */
            <div className="space-y-6">

              {filteredJobs.map((job) => {
                const statusConfig = getStatusClasses(job.status);

                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={job._id}
                    className="
                      bg-white rounded-3xl p-8
                      shadow-xl border border-gray-100
                      hover:shadow-2xl hover:-translate-y-1
                      transition-all duration-300
                    "
                  >

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                      {/* LEFT */}
                      <div className="flex-1">

                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                          {job.title || "Job Title"}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-5">

                          <span className="font-semibold">
                            {job.company || "Company"}
                          </span>

                          <span>•</span>

                          <span>{job.location || "Location"}</span>

                          <span>•</span>

                          <span>{job.jobType || "Full Time"}</span>

                        </div>

                        <div className="flex flex-wrap items-center gap-4">

                          {/* Applications */}
                          <div className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold text-sm">
                            {job.applications?.length || 0} Applications
                          </div>

                          {/* Salary */}
                          <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm">
                            ₹
                            {job.salaryRange?.min || "Negotiable"} - ₹
                            {job.salaryRange?.max || "Negotiable"}
                          </div>

                          {/* Status */}
                          <div
                            className={`
                              flex items-center gap-2 px-4 py-2 rounded-xl
                              ${statusConfig.bg}
                              ${statusConfig.text}
                              font-semibold text-sm
                            `}
                          >

                            <StatusIcon className="w-4 h-4" />

                            <span className="capitalize">
                              {job.status || "active"}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex items-center gap-3">

                        {/* VIEW */}
                        <button
                          onClick={() => navigate(`/job/${job._id}`)}
                          className="
                            p-3 rounded-2xl
                            bg-indigo-50 text-indigo-600
                            hover:bg-indigo-100
                            transition-all duration-300
                          "
                          title="View Job"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => navigate(`/edit-job/${job._id}`)}
                          className="
                            p-3 rounded-2xl
                            bg-blue-50 text-blue-600
                            hover:bg-blue-100
                            transition-all duration-300
                          "
                          title="Edit Job"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteJob(job._id)}
                          className="
                            p-3 rounded-2xl
                            bg-red-50 text-red-600
                            hover:bg-red-100
                            transition-all duration-300
                          "
                          title="Delete Job"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>

                      </div>

                    </div>

                    {/* CREATED DATE */}
                    <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-500">

                      Posted On:{" "}

                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Recently"}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyJobs;