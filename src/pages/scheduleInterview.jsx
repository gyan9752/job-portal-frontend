// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const RecruiterApplications = () => {
//   const [applications, setApplications] = useState([]);

//   const [selectedApp, setSelectedApp] = useState(null);
//   const [dateTime, setDateTime] = useState("");
//   const [mode, setMode] = useState("online");
//   const [meetingLink, setMeetingLink] = useState("");
//   const [location, setLocation] = useState("");
//   const [note, setNote] = useState("");

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/recruiter/applications");
//       setApplications(res.data.applications || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (applicationId, status) => {
//     try {
//       await API.put("/Jobs/application/status", {
//         applicationId,
//         status,
//       });

//       fetchApplications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const scheduleInterview = async () => {
//     try {
//     await API.post(
//   `/application/applications/${selectedApp._id}/schedule-interview`,
//   {
//     dateTime,
//     mode,
//     meetingLink,
//     location,
//     note,
//   }
// );

//       alert("Interview Scheduled Successfully");

//       setSelectedApp(null);
//       setDateTime("");
//       setMode("online");
//       setMeetingLink("");
//       setLocation("");
//       setNote("");

//       fetchApplications();
//     } catch (error) {
//       console.log(error);
//       alert("Failed to schedule interview");
//     }
//   };

//   useEffect(() => {
//     const loadApplications = async () => {
//       try {
//         const res = await API.get("/Jobs/recruiter/applications");
//         setApplications(res.data.applications || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     loadApplications();
//   }, []);

//   const badgeColor = (status) => {
//     if (status === "shortlisted")
//       return "bg-blue-100 text-blue-700";

//     if (status === "rejected")
//       return "bg-red-100 text-red-700";

//     if (status === "hired")
//       return "bg-green-100 text-green-700";

//     if (status === "interView")
//       return "bg-purple-100 text-purple-700";

//     return "bg-yellow-100 text-yellow-700";
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-8">
//           Recruiter Applications
//         </h1>

//         <div className="grid gap-6">
//           {applications.map((app) => (
//             <div
//               key={app._id}
//               className="bg-white rounded-xl shadow p-6"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold">
//                     {app.userId?.name}
//                   </h2>

//                   <p className="text-gray-600">
//                     {app.userId?.email}
//                   </p>

//                   <p className="mt-2 font-semibold">
//                     {app.jobTitle}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     {app.company}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${badgeColor(
//                     app.status
//                   )}`}
//                 >
//                   {app.status}
//                 </span>
//               </div>

//               <div className="flex gap-3 mt-5 flex-wrap">
//                 <a
//                   href={app.resumeUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-gray-800 text-white px-4 py-2 rounded"
//                 >
//                   Resume
//                 </a>

//                 <button
//                   onClick={() =>
//                     updateStatus(app._id, "shortlisted")
//                   }
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Shortlist
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(app._id, "rejected")
//                   }
//                   className="bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(app._id, "hired")
//                   }
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Hire
//                 </button>

//                 <button
//                   onClick={() => setSelectedApp(app)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded"
//                 >
//                   Schedule Interview
//                 </button>
//               </div>
//             </div>
//           ))}

//           {applications.length === 0 && (
//             <div className="bg-white p-8 rounded-xl shadow text-center">
//               No applications found
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedApp && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white w-[500px] rounded-xl p-6 shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">
//               Schedule Interview
//             </h2>

//             <input
//               type="datetime-local"
//               className="w-full border p-3 rounded mb-3"
//               value={dateTime}
//               onChange={(e) =>
//                 setDateTime(e.target.value)
//               }
//             />

//             <select
//               className="w-full border p-3 rounded mb-3"
//               value={mode}
//               onChange={(e) => setMode(e.target.value)}
//             >
//               <option value="online">Online</option>
//               <option value="offline">Offline</option>
//             </select>

//             {mode === "online" ? (
//               <input
//                 type="text"
//                 placeholder="Meeting Link"
//                 className="w-full border p-3 rounded mb-3"
//                 value={meetingLink}
//                 onChange={(e) =>
//                   setMeetingLink(e.target.value)
//                 }
//               />
//             ) : (
//               <input
//                 type="text"
//                 placeholder="Interview Location"
//                 className="w-full border p-3 rounded mb-3"
//                 value={location}
//                 onChange={(e) =>
//                   setLocation(e.target.value)
//                 }
//               />
//             )}

//             <textarea
//               placeholder="Note"
//               className="w-full border p-3 rounded mb-3"
//               value={note}
//               onChange={(e) =>
//                 setNote(e.target.value)
//               }
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={scheduleInterview}
//                 className="bg-blue-600 text-white px-5 py-2 rounded"
//               >
//                 Confirm
//               </button>

//               <button
//                 onClick={() => setSelectedApp(null)}
//                 className="bg-gray-500 text-white px-5 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RecruiterApplications;

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { format, addDays, isPast } from 'date-fns';

const ScheduleInterview = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [application, setApplication] = useState({
    candidate: {
      name: 'Candidate'
    },
    job: {
      title: 'Job Title'
    },
    createdAt: new Date(),
    status: 'pending',
    coverLetter: '',
    interview: null
  });

  const [interview, setInterview] = useState({
    date: '',
    time: '',
    type: 'video',
    location: '',
    notes: ''
  });

  const [showScheduleModal, setShowScheduleModal] = useState(false);

  /* =========================
     Available Slots
  ========================= */
  const availableSlots = useMemo(() => {
    const slots = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const date = addDays(now, i);

      if (!isPast(date)) {
        ['09:00', '11:00', '14:00', '16:00'].forEach((time) => {
          slots.push({
            date: format(date, 'yyyy-MM-dd'),
            time,
            fullDateTime: `${format(date, 'yyyy-MM-dd')} ${time}`
          });
        });
      }
    }

    return slots;
  }, []);

  /* =========================
     Fetch Application
  ========================= */
  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      setApplication(data.application);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Schedule Interview
  ========================= */
  const scheduleInterview = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/applications/${applicationId}/schedule`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },

        body: JSON.stringify({
          ...interview,
          status: 'scheduled'
        })
      });

      setShowScheduleModal(false);

      await fetchApplication();
    } catch (error) {
      console.error('Error scheduling interview:', error);
    }
  };

  /* =========================
     Update Status
  ========================= */
  const updateStatus = async (status) => {
    try {
      await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },

        body: JSON.stringify({ status })
      });

      await fetchApplication();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  /* =========================
     Manual Load Button
  ========================= */
  const handleLoadApplication = async () => {
    await fetchApplication();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="text-center text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() => navigate('/recruiter-dashboard')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
          >
            ← Back to Dashboard
          </button>

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {application?.candidate?.name} - {application?.job?.title}
              </h1>

              <p className="text-gray-500">
                Applied:
                {' '}
                {application?.createdAt
                  ? format(
                      new Date(application.createdAt),
                      'MMM dd, yyyy'
                    )
                  : 'N/A'}
              </p>
            </div>

            <button
              onClick={handleLoadApplication}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
            >
              Refresh Data
            </button>

          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => updateStatus('shortlisted')}
              className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircleIcon className="h-5 w-5" />
              Shortlist
            </button>

            <button
              onClick={() => updateStatus('rejected')}
              className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 flex items-center gap-2"
            >
              <XCircleIcon className="h-5 w-5" />
              Reject
            </button>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 flex items-center gap-2"
            >
              <CalendarIcon className="h-5 w-5" />
              Schedule Interview
            </button>

          </div>
        </div>

        {/* Cover Letter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          <h3 className="text-xl font-bold mb-4">
            Cover Letter
          </h3>

          <p className="text-gray-700 whitespace-pre-wrap">
            {application?.coverLetter || 'No cover letter available'}
          </p>

        </div>

        {/* Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-2xl max-w-lg w-full p-8">

              <h2 className="text-2xl font-bold mb-6">
                Schedule Interview
              </h2>

              <form
                onSubmit={scheduleInterview}
                className="space-y-6"
              >

                {/* Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Slot
                  </label>

                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">

                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setInterview((prev) => ({
                            ...prev,
                            date: slot.date,
                            time: slot.time
                          }))
                        }
                        className={`p-3 rounded-xl border ${
                          interview.date === slot.date &&
                          interview.time === slot.time
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="font-medium">
                          {format(
                            new Date(slot.date),
                            'EEE dd'
                          )}
                        </div>

                        <div className="text-sm text-gray-500">
                          {slot.time}
                        </div>
                      </button>
                    ))}

                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interview Type
                  </label>

                  <div className="flex gap-4">

                    <button
                      type="button"
                      onClick={() =>
                        setInterview((prev) => ({
                          ...prev,
                          type: 'video'
                        }))
                      }
                      className={`flex-1 p-4 rounded-xl border ${
                        interview.type === 'video'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <VideoCameraIcon className="h-6 w-6 mx-auto mb-2 text-indigo-600" />

                      <div>Video Call</div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInterview((prev) => ({
                          ...prev,
                          type: 'inperson'
                        }))
                      }
                      className={`flex-1 p-4 rounded-xl border ${
                        interview.type === 'inperson'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <MapPinIcon className="h-6 w-6 mx-auto mb-2 text-indigo-600" />

                      <div>In-person</div>
                    </button>

                  </div>
                </div>

                {/* Location */}
                {interview.type === 'inperson' && (
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>

                    <input
                      type="text"
                      value={interview.location}
                      onChange={(e) =>
                        setInterview((prev) => ({
                          ...prev,
                          location: e.target.value
                        }))
                      }
                      placeholder="Office address"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    />

                  </div>
                )}

                {/* Notes */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>

                  <textarea
                    rows={3}
                    value={interview.notes}
                    onChange={(e) =>
                      setInterview((prev) => ({
                        ...prev,
                        notes: e.target.value
                      }))
                    }
                    placeholder="Additional notes..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                  />

                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">

                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!interview.date || !interview.time}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-400"
                  >
                    Confirm
                  </button>

                </div>

              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleInterview;