

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// const JobApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/recruiter/applications");

//       console.log("API Response:", res.data);

//       setApplications(res.data.applications || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put("/Jobs/application/status", {
//         applicationId: id,
//         status,
//       });

//       fetchApplications();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed");
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchApplications();
//     })();
//   }, []);

//   const badgeColor = (status) => {
//     if (status === "shortlisted") return "text-blue-700";
//     if (status === "hired") return "text-green-700";
//     if (status === "rejected") return "text-red-700";
//     if (status === "interView") return "text-purple-700";
//     return "text-yellow-700";
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           Job Applications
//         </h1>

//         <div className="space-y-5">
//           {applications.length > 0 ? (
//             applications.map((item) => {

//               console.log("Single Item:", item);
//               console.log("Resume from item:", item.resume);
//               console.log("Resume from userId:", item.userId?.resume);

//               return (
//                 <div
//                   key={item._id}
//                   className="bg-white p-6 rounded-xl shadow"
//                 >
//                   <h2 className="text-2xl font-bold">
//                     {item.userId?.name}
//                   </h2>

//                   <p>{item.userId?.email}</p>

//                   <p className="mt-2">
//                     Applied For: {item.jobId?.title}
//                   </p>

//                   <p
//                     className={`mt-2 font-semibold ${badgeColor(
//                       item.status
//                     )}`}
//                   >
//                     Status: {item.status}
//                   </p>

//                   <div className="mt-4 flex gap-3 flex-wrap">
//                     <button
//                       onClick={() =>
//                         updateStatus(item._id, "shortlisted")
//                       }
//                       className="bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                       Shortlist
//                     </button>

//                     <button
//                       onClick={() =>
//                         navigate("/recruiter-applications")
//                       }
//                       className="bg-yellow-500 text-white px-4 py-2 rounded"
//                     >
//                       Interview
//                     </button>

//                     <button
//                       onClick={() =>
//                         updateStatus(item._id, "hired")
//                       }
//                       className="bg-green-600 text-white px-4 py-2 rounded"
//                     >
//                       Hire
//                     </button>

//                     <button
//                       onClick={() =>
//                         updateStatus(item._id, "rejected")
//                       }
//                       className="bg-red-600 text-white px-4 py-2 rounded"
//                     >
//                       Reject
//                     </button>

//                       {/* <p className="text-sm text-red-500">
//   {item.userId?.resume}
// </p> */}
//                     <a
//                       href={`http://localhost:8080${item.userId?.resume}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Resume
//                     </a>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="bg-white p-8 rounded-xl shadow text-center">
//               No applications found
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobApplications;


import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ useCallback added to fix exhaustive-deps warning
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/Jobs/recruiter/applications");

      setApplications(res.data.applications || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put("/Jobs/application/status", {
        applicationId: id,
        status,
      });

      await fetchApplications();
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed");
    }
  };

  // ✅ Fixed ESLint react-hooks/set-state-in-effect
  useEffect(() => {
    const loadApplications = async () => {
      await fetchApplications();
    };

    loadApplications();
  }, [fetchApplications]);

  const getStatusColor = (status) => {
    const colors = {
      shortlisted: "from-blue-500 to-indigo-600",
      hired: "from-emerald-500 to-green-600",
      rejected: "from-rose-500 to-red-600",
      interView: "from-purple-500 to-violet-600",
      pending: "from-amber-500 to-yellow-600",
    };

    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const text = {
      shortlisted: "Shortlisted ✅",
      hired: "Hired 🎉",
      rejected: "Rejected ❌",
      interView: "Interview Scheduled 📅",
      pending: "Pending ⏳",
    };

    return text[status] || "Pending";
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
          <div className="glass-card p-16 text-center">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-8"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loading Applications
            </h2>

            <p className="text-xl text-gray-600">
              Fetching latest applications...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="glass-card p-12 mb-12 shadow-2xl shadow-black/10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40">
                <UserIcon className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                  Job Applications
                </h1>

                <p className="text-xl text-gray-700">
                  {applications.length} applications received
                </p>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-6">
            {applications.length > 0 ? (
              applications.map((item) => (
                <div
                  key={item._id}
                  className="glass-card p-8 md:p-10 shadow-xl shadow-black/10 group hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* User Info */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6 pb-6 border-b border-white/40">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                        <UserIcon className="w-8 h-8 text-white" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {item.userId?.name}
                        </h3>

                        <p className="text-lg text-gray-600">
                          {item.userId?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="px-4 py-2 rounded-2xl font-bold text-lg bg-gradient-to-r from-gray-100 to-gray-200 shadow-sm">
                        Applied for: {item.jobId?.title}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="
                        px-6 py-3 rounded-2xl font-bold text-lg shadow-lg shadow-black/10
                        bg-gradient-to-r from-white/60
                      "
                    >
                      <span
                        className={`bg-gradient-to-r ${getStatusColor(
                          item.status
                        )} bg-clip-text text-transparent`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Shortlist */}
                    <button
                      onClick={() =>
                        updateStatus(item._id, "shortlisted")
                      }
                      className="
                        group relative overflow-hidden rounded-2xl py-4 px-6 font-semibold
                        backdrop-blur-sm bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white
                        shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/50
                        hover:scale-105 transition-all duration-300
                      "
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5" />

                        <span>Shortlist</span>
                      </span>
                    </button>

                    {/* Interview */}
                    <button
                      onClick={() =>
                        navigate("/recruiter-applications")
                      }
                      className="
                        group relative overflow-hidden rounded-2xl py-4 px-6 font-semibold
                        backdrop-blur-sm bg-gradient-to-r from-amber-500/90 to-yellow-600/90 text-white
                        shadow-2xl shadow-amber-500/30 hover:shadow-3xl hover:shadow-amber-500/50
                        hover:scale-105 transition-all duration-300
                      "
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                        <span>Interview</span>
                      </span>
                    </button>

                    {/* Hire */}
                    <button
                      onClick={() =>
                        updateStatus(item._id, "hired")
                      }
                      className="
                        group relative overflow-hidden rounded-2xl py-4 px-6 font-semibold
                        backdrop-blur-sm bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white
                        shadow-2xl shadow-emerald-500/30 hover:shadow-3xl hover:shadow-emerald-500/50
                        hover:scale-105 transition-all duration-300
                      "
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <span>Hire</span>
                      </span>
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() =>
                        updateStatus(item._id, "rejected")
                      }
                      className="
                        group relative overflow-hidden rounded-2xl py-4 px-6 font-semibold
                        backdrop-blur-sm bg-gradient-to-r from-rose-500/90 to-red-600/90 text-white
                        shadow-2xl shadow-rose-500/30 hover:shadow-3xl hover:shadow-rose-500/50
                        hover:scale-105 transition-all duration-300
                      "
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <XCircleIcon className="w-5 h-5" />

                        <span>Reject</span>
                      </span>
                    </button>
                  </div>

                  {/* Resume */}
                  {item.userId?.resume && (
                    <div className="mt-8 pt-6 border-t border-white/40">
                      <a
                        href={`http://localhost:8080${item.userId?.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold
                          backdrop-blur-sm bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-white
                          shadow-xl shadow-gray-900/40 hover:shadow-2xl hover:shadow-gray-900/60
                          hover:scale-105 transition-all duration-300
                        "
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>

                        <span>View Resume</span>
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="glass-card p-20 text-center shadow-2xl shadow-black/10">
                <BriefcaseIcon className="w-24 h-24 text-gray-400 mx-auto mb-8" />

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No Applications Yet
                </h3>

                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                  Your job postings will appear here once candidates apply.
                </p>

                <button
                  onClick={() => navigate("/create-job")}
                  className="
                    px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white
                    font-bold text-xl rounded-3xl shadow-2xl shadow-emerald-500/50
                    hover:from-emerald-600 hover:to-green-700 hover:shadow-3xl hover:shadow-emerald-500/70
                    hover:scale-105 transition-all duration-300
                  "
                >
                  Post Your First Job
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplications;