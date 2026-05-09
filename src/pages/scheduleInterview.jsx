import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [mode, setMode] = useState("online");
  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await API.get("/Jobs/recruiter/applications");
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await API.put("/Jobs/application/status", {
        applicationId,
        status,
      });

      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const scheduleInterview = async () => {
    try {
    await API.post(
  `/application/applications/${selectedApp._id}/schedule-interview`,
  {
    dateTime,
    mode,
    meetingLink,
    location,
    note,
  }
);

      alert("Interview Scheduled Successfully");

      setSelectedApp(null);
      setDateTime("");
      setMode("online");
      setMeetingLink("");
      setLocation("");
      setNote("");

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to schedule interview");
    }
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await API.get("/Jobs/recruiter/applications");
        setApplications(res.data.applications || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadApplications();
  }, []);

  const badgeColor = (status) => {
    if (status === "shortlisted")
      return "bg-blue-100 text-blue-700";

    if (status === "rejected")
      return "bg-red-100 text-red-700";

    if (status === "hired")
      return "bg-green-100 text-green-700";

    if (status === "interView")
      return "bg-purple-100 text-purple-700";

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">
          Recruiter Applications
        </h1>

        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {app.userId?.name}
                  </h2>

                  <p className="text-gray-600">
                    {app.userId?.email}
                  </p>

                  <p className="mt-2 font-semibold">
                    {app.jobTitle}
                  </p>

                  <p className="text-sm text-gray-500">
                    {app.company}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${badgeColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              <div className="flex gap-3 mt-5 flex-wrap">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Resume
                </a>

                <button
                  onClick={() =>
                    updateStatus(app._id, "shortlisted")
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    updateStatus(app._id, "rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(app._id, "hired")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Hire
                </button>

                <button
                  onClick={() => setSelectedApp(app)}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              No applications found
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Schedule Interview
            </h2>

            <input
              type="datetime-local"
              className="w-full border p-3 rounded mb-3"
              value={dateTime}
              onChange={(e) =>
                setDateTime(e.target.value)
              }
            />

            <select
              className="w-full border p-3 rounded mb-3"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            {mode === "online" ? (
              <input
                type="text"
                placeholder="Meeting Link"
                className="w-full border p-3 rounded mb-3"
                value={meetingLink}
                onChange={(e) =>
                  setMeetingLink(e.target.value)
                }
              />
            ) : (
              <input
                type="text"
                placeholder="Interview Location"
                className="w-full border p-3 rounded mb-3"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            )}

            <textarea
              placeholder="Note"
              className="w-full border p-3 rounded mb-3"
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />

            <div className="flex gap-3">
              <button
                onClick={scheduleInterview}
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterApplications;
