// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/my-applications");
//       setApplications(res.data.applications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchApplications();
//     })();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           My Applications
//         </h1>

//         <div className="grid md:grid-cols-3 gap-6">
//           {applications.length > 0 ? (
//             applications.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow rounded-xl p-6"
//               >
//                 <h2 className="text-2xl font-bold text-blue-700">
//                   {item.jobId?.title}
//                 </h2>

//                 <p className="mt-2">{item.jobId?.company}</p>

//                 <p>{item.jobId?.location}</p>

//                 <p className="mt-3">
//                   Status:
//                   <span className="ml-2 font-bold text-green-600">
//                     {item.status}
//                   </span>
//                 </p>

//                 <p className="text-sm text-gray-500 mt-2">
//                   Applied On:
//                   {" "}
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No Applications Found</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyApplications;

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIXED: useCallback added
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/Jobs/my-applications");

      setApplications(res.data?.applications || []);
    } catch (err) {
      console.log(err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED: async call inside effect
  useEffect(() => {
    const loadApplications = async () => {
      await fetchApplications();
    };

    loadApplications();
  }, [fetchApplications]);

  const getStatusConfig = (status) => {
    const configs = {
      applied: {
        bg: "from-yellow-100 to-amber-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: ClockIcon,
        label: "Applied ⏳",
      },

      shortlisted: {
        bg: "from-blue-100 to-indigo-100",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: CheckCircleIcon,
        label: "Shortlisted ✅",
      },

      interview: {
        bg: "from-purple-100 to-violet-100",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: ClockIcon,
        label: "Interview Scheduled 📅",
      },

      interView: {
        bg: "from-purple-100 to-violet-100",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: ClockIcon,
        label: "Interview Scheduled 📅",
      },

      hired: {
        bg: "from-emerald-100 to-green-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircleIcon,
        label: "Hired 🎉",
      },

      rejected: {
        bg: "from-red-100 to-rose-100",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircleIcon,
        label: "Rejected ❌",
      },
    };

    return configs[status] || configs.applied;
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="bg-white shadow-2xl rounded-3xl p-14 text-center max-w-lg w-full">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-8"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Loading Applications
            </h2>

            <p className="text-lg text-gray-600">
              Fetching your applied jobs...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 border border-gray-100">
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <BriefcaseIcon className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  My Applications
                </h1>

                <p className="text-lg text-gray-600 mt-2">
                  {applications.length} application
                  {applications.length !== 1 ? "s" : ""} submitted
                </p>
              </div>

            </div>
          </div>

          {/* Empty State */}
          {applications.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-2xl p-16 text-center max-w-3xl mx-auto">

              <BriefcaseIcon className="w-28 h-28 text-gray-300 mx-auto mb-8" />

              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                No Applications Yet
              </h3>

              <p className="text-xl text-gray-600 mb-10">
                Start applying for jobs to track your application status here.
              </p>

              <Link
                to="/jobs"
                className="
                  inline-flex items-center justify-center
                  px-10 py-4 rounded-2xl
                  bg-gradient-to-r from-indigo-500 to-blue-600
                  text-white text-lg font-bold
                  shadow-xl hover:scale-105 transition-all duration-300
                "
              >
                Browse Jobs
              </Link>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {applications.map((item) => {
                const status = getStatusConfig(item.status);

                const StatusIcon = status.icon;

                const interviewData =
                  item.interView || item.interview || {};

                return (
                  <div
                    key={item._id}
                    className="
                      bg-white rounded-3xl p-8
                      shadow-xl border border-gray-100
                      hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-300
                    "
                  >

                    {/* Job Info */}
                    <div className="flex items-start gap-4 mb-6">

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <BriefcaseIcon className="w-7 h-7 text-white" />
                      </div>

                      <div className="min-w-0">

                        <h2 className="text-2xl font-bold text-gray-900 mb-1 break-words">
                          {item.jobId?.title || "Job Title"}
                        </h2>

                        <p className="text-lg font-semibold text-gray-700">
                          {item.jobId?.company || "Company"}
                        </p>

                        <p className="text-gray-500">
                          {item.jobId?.location || "Location"}
                        </p>

                      </div>

                    </div>

                    {/* Status */}
                    <div
                      className={`
                        flex items-center gap-3
                        px-5 py-4 rounded-2xl mb-6
                        bg-gradient-to-r ${status.bg}
                        border ${status.border}
                      `}
                    >

                      <StatusIcon className={`w-6 h-6 ${status.text}`} />

                      <span className={`font-bold text-lg ${status.text}`}>
                        {status.label}
                      </span>

                    </div>

                    {/* Applied Date */}
                    <div className="border-t border-gray-200 pt-5 text-sm text-gray-500">

                      <span className="font-semibold text-gray-700">
                        Applied On:
                      </span>{" "}

                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Recently"}

                    </div>

                    {/* Interview Details */}
                    {(item.status === "interview" ||
                      item.status === "interView") &&
                      interviewData?.scheduleAt && (

                        <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5">

                          <div className="flex items-center gap-2 mb-4">

                            <ClockIcon className="w-5 h-5 text-purple-700" />

                            <h4 className="text-lg font-bold text-purple-800">
                              Interview Details
                            </h4>

                          </div>

                          <div className="space-y-3 text-sm text-gray-700">

                            <p>
                              <span className="font-semibold">
                                Date & Time:
                              </span>{" "}

                              {new Date(
                                interviewData.scheduleAt
                              ).toLocaleString()}
                            </p>

                            <p>
                              <span className="font-semibold">Mode:</span>{" "}
                              {interviewData.mode || "N/A"}
                            </p>

                            {interviewData.mode === "online" &&
                              interviewData.meetingLink && (

                                <a
                                  href={interviewData.meetingLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="
                                    inline-flex items-center
                                    px-4 py-2 rounded-xl
                                    bg-purple-600 text-white
                                    font-semibold
                                    hover:bg-purple-700
                                    transition-all
                                  "
                                >
                                  Join Meeting
                                </a>
                              )}

                            {interviewData.mode === "offline" &&
                              interviewData.location && (
                                <p>
                                  <span className="font-semibold">
                                    Location:
                                  </span>{" "}
                                  {interviewData.location}
                                </p>
                              )}

                            {interviewData.note && (
                              <p>
                                <span className="font-semibold">
                                  Note:
                                </span>{" "}
                                {interviewData.note}
                              </p>
                            )}

                          </div>

                        </div>
                      )}

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

export default MyApplications;