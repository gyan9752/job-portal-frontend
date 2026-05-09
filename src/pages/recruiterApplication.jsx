
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

const RecruiterApplications = () => {
  // const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const [loadingId, setLoadingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    scheduleAt: "",
    mode: "online",
    meetingLink: "",
    location: "",
    note: "",
  });

  const fetchApplications = async () => {
    try {
      const res = await API.get("/Jobs/recruiter/applications");
      setApplications(res.data.applications || []);
    } catch {
      toast.error("Failed to load");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApplications();
    })();
  }, []);

  // ✅ Status Update
  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);

      await API.put("/Jobs/application/status", {
        applicationId: id,
        status,
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Failed");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Schedule / Reschedule
  const handleInterview = async () => {
    try {
      setSaving(true);

      if (selectedApp?.interView) {
        await API.patch(
          `/reschedule/applications/${selectedApp._id}/reschedule`,
          formData
        );
        toast.success("Rescheduled");
      } else {
        await API.post(
          `/Jobs/applications/${selectedApp._id}/schedule-interview`,
          formData
        );
        toast.success("Scheduled");
      }

      setSelectedApp(null);
      fetchApplications();
    } catch {
      toast.error("Error");
    } finally {
      setSaving(false);
    }
  };

  // ❌ Cancel
  const cancelInterview = async (id) => {
    const reason = prompt("Reason?");
    if (!reason) return;

    try {
      setLoadingId(id);
      await API.put(`/reschedule/interviews/${id}/cancel`, { reason });
      toast.success("Cancelled");
      fetchApplications();
    } catch {
      toast.error("Failed");
    } finally {
      setLoadingId(null);
    }
  };

  // 🎯 Filtered Data
  const filteredApps = applications
    .filter((app) =>
      app.userId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((app) =>
      filter === "all" ? true : app.status === filter
    );

  const badge = (status) => {
    const map = {
      shortlisted: "bg-blue-100 text-blue-600",
      rejected: "bg-red-100 text-red-600",
      hired: "bg-green-100 text-green-600",
      interView: "bg-purple-100 text-purple-600",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-semibold mb-4">
          Recruiter Applications
        </h1>

{/* 🔍 Search + Filter */}
<div className="flex gap-3 mb-4">
  <input
    placeholder="Search candidate..."
    className="border p-2 rounded w-full"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {["all", "shortlisted", "rejected", "hired", "interView"].map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-3 py-1 rounded ${
        filter === f ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {f}
    </button>
  ))}
</div>

        {/* Cards */}
        <div className="grid gap-4">
          {filteredApps.map((app) => (
            <div key={app._id} className="bg-white p-4 rounded shadow">

              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{app.userId?.name}</h2>
                  <p className="text-sm text-gray-500">{app.userId?.email}</p>
                </div>

                <span className={`px-3 py-1 rounded ${badge(app.status)}`}>
                  {app.status}
                </span>
              </div>

              {/* Interview Info */}
              {app.interView && (
                <div className="text-sm mt-2 bg-gray-50 p-2 rounded">
                  {new Date(app.interView.scheduleAt).toLocaleString()}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
               

                <button
                  disabled={loadingId === app._id}
                  onClick={() => updateStatus(app._id, "shortlisted")}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {loadingId === app._id ? "..." : "Shortlist"}
                </button>

                <button
                  disabled={loadingId === app._id}
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Reject
                </button>

                <button
                  disabled={loadingId === app._id}
                  onClick={() => updateStatus(app._id, "hired")}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Hire
                </button>

                <button
                  onClick={() => setSelectedApp(app)}
                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
                >
                  {app.interView ? "Reschedule" : "Schedule"}
                </button>
                {app.interView && (
                  <button
                    disabled={loadingId === app._id}
                    onClick={() => cancelInterview(app._id)}
                    className="bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[400px]">
            <h2 className="mb-3 font-semibold">
              {selectedApp.interView ? "Reschedule" : "Schedule"}
            </h2>

            <input
              type="datetime-local"
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setFormData({ ...formData, scheduleAt: e.target.value })
              }
            />

            <button
              disabled={saving}
              onClick={handleInterview}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterApplications;