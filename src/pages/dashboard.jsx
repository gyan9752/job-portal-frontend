import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [interview, setInterview] = useState(null);
  const [appliedCount, setAppliedCount] = useState(0);

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  /* FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "candidate") {
          const jobRes = await API.get("/Jobs/all");
          setJobs(jobRes.data?.jobs || []);

          const appRes = await API.get("/application/my-applications");
          setAppliedCount(appRes.data?.applications?.length || 0);

          const intRes = await API.get("/upcoming-interview");
          setInterview(intRes.data?.interview || null);
        }

        if (user?.role === "recruiter") {
          const jobRes = await API.get("/Jobs/all");
          setJobs(jobRes.data?.jobs || []);
        }
      } catch (err) {
        console.log("Dashboard error:", err);
      }
    };

    fetchData();
  }, [user?.role]);

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">
          Welcome {user?.name || "User"} 👋
        </h1>

        {/* ================= CANDIDATE ================= */}
        {user?.role === "candidate" && (
          <>
            {/* Interview */}
            {interview && (
              <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl font-bold text-blue-600">
                  Upcoming Interview
                </h2>

                <p>{interview?.jobId?.title}</p>
                <p>{interview?.jobId?.company}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">{jobs.length}</h2>
                <p>Latest Jobs</p>
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">
                  {appliedCount}
                </h2>
                <p>Applications</p>
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">
                  {user?.resume ? "100%" : "60%"}
                </h2>
                <p>Profile</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-8 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Browse Jobs
            </button>

            {/* Jobs */}
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {(jobs || []).map((job) => (
                <div key={job._id} className="bg-white p-4 shadow rounded">
                  <h3 className="font-bold">{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= RECRUITER ================= */}
        {user?.role === "recruiter" && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">{jobs.length}</h2>
                <p>Total Jobs</p>
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">Active</h2>
                <p>Status</p>
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-bold">Ready</h2>
                <p>Hiring</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigate("/create-job")}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Create Job
              </button>

              <button
                onClick={() => navigate("/my-jobs")}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                My Jobs
              </button>
            </div>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user?.role === "admin" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-2xl font-bold">Users</h2>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-2xl font-bold">Jobs</h2>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <h2 className="text-2xl font-bold">Recruiters</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;