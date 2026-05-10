
// import { useEffect, useState } from "react";
// //import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../services/api";
// import toast from "react-hot-toast";

// const RecruiterApplications = () => {
//   // const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);
//   const [selectedApp, setSelectedApp] = useState(null);

//   const [loadingId, setLoadingId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");

//   const [formData, setFormData] = useState({
//     scheduleAt: "",
//     mode: "online",
//     meetingLink: "",
//     location: "",
//     note: "",
//   });

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/recruiter/applications");
//       setApplications(res.data.applications || []);
//     } catch {
//       toast.error("Failed to load");
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchApplications();
//     })();
//   }, []);

//   // ✅ Status Update
//   const updateStatus = async (id, status) => {
//     try {
//       setLoadingId(id);

//       await API.put("/Jobs/application/status", {
//         applicationId: id,
//         status,
//       });

//       setApplications((prev) =>
//         prev.map((app) =>
//           app._id === id ? { ...app, status } : app
//         )
//       );

//       toast.success("Status updated");
//     } catch {
//       toast.error("Failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   // ✅ Schedule / Reschedule
//   const handleInterview = async () => {
//     try {
//       setSaving(true);

//       if (selectedApp?.interView) {
//         await API.patch(
//           `/reschedule/applications/${selectedApp._id}/reschedule`,
//           formData
//         );
//         toast.success("Rescheduled");
//       } else {
//         await API.post(
//           `/Jobs/applications/${selectedApp._id}/schedule-interview`,
//           formData
//         );
//         toast.success("Scheduled");
//       }

//       setSelectedApp(null);
//       fetchApplications();
//     } catch {
//       toast.error("Error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ❌ Cancel
//   const cancelInterview = async (id) => {
//     const reason = prompt("Reason?");
//     if (!reason) return;

//     try {
//       setLoadingId(id);
//       await API.put(`/reschedule/interviews/${id}/cancel`, { reason });
//       toast.success("Cancelled");
//       fetchApplications();
//     } catch {
//       toast.error("Failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   // 🎯 Filtered Data
//   const filteredApps = applications
//     .filter((app) =>
//       app.userId?.name
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//     )
//     .filter((app) =>
//       filter === "all" ? true : app.status === filter
//     );

//   const badge = (status) => {
//     const map = {
//       shortlisted: "bg-blue-100 text-blue-600",
//       rejected: "bg-red-100 text-red-600",
//       hired: "bg-green-100 text-green-600",
//       interView: "bg-purple-100 text-purple-600",
//     };
//     return map[status] || "bg-gray-100 text-gray-600";
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-xl font-semibold mb-4">
//           Recruiter Applications
//         </h1>

// {/* 🔍 Search + Filter */}
// <div className="flex gap-3 mb-4">
//   <input
//     placeholder="Search candidate..."
//     className="border p-2 rounded w-full"
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//   />

//   {["all", "shortlisted", "rejected", "hired", "interView"].map((f) => (
//     <button
//       key={f}
//       onClick={() => setFilter(f)}
//       className={`px-3 py-1 rounded ${
//         filter === f ? "bg-black text-white" : "bg-gray-200"
//       }`}
//     >
//       {f}
//     </button>
//   ))}
// </div>

//         {/* Cards */}
//         <div className="grid gap-4">
//           {filteredApps.map((app) => (
//             <div key={app._id} className="bg-white p-4 rounded shadow">

//               {/* Header */}
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h2 className="font-semibold">{app.userId?.name}</h2>
//                   <p className="text-sm text-gray-500">{app.userId?.email}</p>
//                 </div>

//                 <span className={`px-3 py-1 rounded ${badge(app.status)}`}>
//                   {app.status}
//                 </span>
//               </div>

//               {/* Interview Info */}
//               {app.interView && (
//                 <div className="text-sm mt-2 bg-gray-50 p-2 rounded">
//                   {new Date(app.interView.scheduleAt).toLocaleString()}
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex flex-wrap gap-2 mt-3">
               

//                 <button
//                   disabled={loadingId === app._id}
//                   onClick={() => updateStatus(app._id, "shortlisted")}
//                   className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
//                 >
//                   {loadingId === app._id ? "..." : "Shortlist"}
//                 </button>

//                 <button
//                   disabled={loadingId === app._id}
//                   onClick={() => updateStatus(app._id, "rejected")}
//                   className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Reject
//                 </button>

//                 <button
//                   disabled={loadingId === app._id}
//                   onClick={() => updateStatus(app._id, "hired")}
//                   className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Hire
//                 </button>

//                 <button
//                   onClick={() => setSelectedApp(app)}
//                   className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
//                 >
//                   {app.interView ? "Reschedule" : "Schedule"}
//                 </button>
//                 {app.interView && (
//                   <button
//                     disabled={loadingId === app._id}
//                     onClick={() => cancelInterview(app._id)}
//                     className="bg-red-700 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedApp && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//           <div className="bg-white p-5 rounded w-[400px]">
//             <h2 className="mb-3 font-semibold">
//               {selectedApp.interView ? "Reschedule" : "Schedule"}
//             </h2>

//             <input
//               type="datetime-local"
//               className="border p-2 w-full mb-2"
//               onChange={(e) =>
//                 setFormData({ ...formData, scheduleAt: e.target.value })
//               }
//             />

//             <button
//               disabled={saving}
//               onClick={handleInterview}
//               className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RecruiterApplications;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

/* =========================
   Status Filter Component
========================= */
const StatusFilter = ({
  status,
  label,
  count,
  currentStatus,
  setFilters
}) => {
  return (
    <button
      onClick={() =>
        setFilters((prev) => ({
          ...prev,
          status
        }))
      }
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 font-semibold transition-all hover:shadow-md ${
        currentStatus === status
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
          : 'border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700'
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-current" />

      <span>{label}</span>

      <span className="text-sm font-normal bg-white/20 px-2 py-1 rounded-full min-w-[2rem]">
        {count}
      </span>
    </button>
  );
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    jobTitle: ''
  });

  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0
  });

  /* =========================
     Fetch Applications
  ========================= */
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        status: filters.status === 'all' ? '' : filters.status,
        search: filters.search,
        jobTitle: filters.jobTitle
      });

      const [appsRes, statsRes] = await Promise.all([
        fetch(`/api/recruiter/applications?${params}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }),

        fetch('/api/recruiter/applications/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      const appsData = await appsRes.json();
      const statsData = await statsRes.json();

      setApplications(appsData.applications || []);

      setStats(
        statsData || {
          total: 0,
          shortlisted: 0,
          rejected: 0,
          pending: 0
        }
      );
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     useEffect
  ========================= */
  useEffect(() => {
    let ignore = false;

    const loadApplications = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          status: filters.status === 'all' ? '' : filters.status,
          search: filters.search,
          jobTitle: filters.jobTitle
        });

        const [appsRes, statsRes] = await Promise.all([
          fetch(`/api/recruiter/applications?${params}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),

          fetch('/api/recruiter/applications/stats', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        const appsData = await appsRes.json();
        const statsData = await statsRes.json();

        if (!ignore) {
          setApplications(appsData.applications || []);

          setStats(
            statsData || {
              total: 0,
              shortlisted: 0,
              rejected: 0,
              pending: 0
            }
          );
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadApplications();

    return () => {
      ignore = true;
    };
  }, [filters]);

  /* =========================
     Update Status
  ========================= */
  const updateStatus = async (applicationId, status) => {
    if (!window.confirm(`Mark this application as ${status}?`)) {
      return;
    }

    try {
      await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${localStorage.getItem('token')}`
        },

        body: JSON.stringify({ status })
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

      setStats((prev) => ({
        ...prev,
        [status]: prev[status] + 1,

        pending:
          status !== 'pending'
            ? Math.max(prev.pending - 1, 0)
            : prev.pending
      }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  /* =========================
     Status Badge
  ========================= */
  const getStatusBadge = (status) => {
    const badges = {
      shortlisted:
        'bg-green-100 text-green-800 border-green-200',

      rejected:
        'bg-red-100 text-red-800 border-red-200',

      pending:
        'bg-yellow-100 text-yellow-800 border-yellow-200',

      scheduled:
        'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      badges[status] ||
      'bg-gray-100 text-gray-800 border-gray-200'
    );
  };

  /* =========================
     Filter Applications
  ========================= */
  const filteredApplications = applications.filter((app) => {
    const candidateName =
      app?.candidate?.name?.toLowerCase() || '';

    const jobTitle =
      app?.job?.title?.toLowerCase() || '';

    const searchText = filters.search.toLowerCase();

    const matchesSearch =
      candidateName.includes(searchText) ||
      jobTitle.includes(searchText);

    const matchesJob =
      !filters.jobTitle ||
      jobTitle.includes(filters.jobTitle.toLowerCase());

    return matchesSearch && matchesJob;
  });

  /* =========================
     Loading
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-6">

            <UserGroupIcon className="h-12 w-12 text-indigo-600" />

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Job Applications
              </h1>

              <p className="text-xl text-gray-600">
                Review and manage {stats.total} applications
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl">

            <StatusFilter
              status="all"
              label="All"
              count={stats.total}
              currentStatus={filters.status}
              setFilters={setFilters}
            />

            <StatusFilter
              status="pending"
              label="Pending"
              count={stats.pending}
              currentStatus={filters.status}
              setFilters={setFilters}
            />

            <StatusFilter
              status="shortlisted"
              label="Shortlisted"
              count={stats.shortlisted}
              currentStatus={filters.status}
              setFilters={setFilters}
            />

            <StatusFilter
              status="rejected"
              label="Rejected"
              count={stats.rejected}
              currentStatus={filters.status}
              setFilters={setFilters}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">

            <div className="relative flex-1 md:max-w-md">

              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search by name or job title..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value
                  }))
                }
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500"
              />
            </div>

            <input
              type="text"
              placeholder="Filter by job title..."
              value={filters.jobTitle}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  jobTitle: e.target.value
                }))
              }
              className="flex-1 md:max-w-md px-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500"
            />

            <button
              onClick={fetchApplications}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition"
            >
              <FunnelIcon className="h-5 w-5 inline mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-4">

          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {application?.candidate?.name}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {application?.job?.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Applied on{' '}
                      {format(
                        new Date(application.createdAt),
                        'MMM dd, yyyy'
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`px-4 py-2 rounded-xl border text-sm font-medium ${getStatusBadge(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                    <Link
                      to={`/recruiter-application/${application._id}`}
                      className="p-2 hover:bg-gray-100 rounded-xl transition"
                    >
                      <EyeIcon className="h-5 w-5 text-gray-700" />
                    </Link>
                  </div>
                </div>

                {/* Action Buttons */}
                {application.status === 'pending' && (
                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          'shortlisted'
                        )
                      }
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application._id,
                          'rejected'
                        )
                      }
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Applications Found
              </h2>

              <p className="text-gray-500">
                Try changing your filters or search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;