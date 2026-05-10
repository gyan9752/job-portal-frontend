// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [interview, setInterview] = useState(null);
//   const [appliedCount, setAppliedCount] = useState(0);

//   let user = {};
//   try {
//     user = JSON.parse(localStorage.getItem("user") || "{}");
//   } catch {
//     user = {};
//   }

//   /* FETCH DATA */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (user?.role === "candidate") {
//           const jobRes = await API.get("/Jobs/all");
//           setJobs(jobRes.data?.jobs || []);

//           const appRes = await API.get("/application/my-applications");
//           setAppliedCount(appRes.data?.applications?.length || 0);

//           const intRes = await API.get("/upcoming-interview");
//           setInterview(intRes.data?.interview || null);
//         }

//         if (user?.role === "recruiter") {
//           const jobRes = await API.get("/Jobs/all");
//           setJobs(jobRes.data?.jobs || []);
//         }
//       } catch (err) {
//         console.log("Dashboard error:", err);
//       }
//     };

//     fetchData();
//   }, [user?.role]);

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           Welcome {user?.name || "User"} 👋
//         </h1>

//         {/* ================= CANDIDATE ================= */}
//         {user?.role === "candidate" && (
//           <>
//             {/* Interview */}
//             {interview && (
//               <div className="bg-white p-6 rounded shadow mb-6">
//                 <h2 className="text-xl font-bold text-blue-600">
//                   Upcoming Interview
//                 </h2>

//                 <p>{interview?.jobId?.title}</p>
//                 <p>{interview?.jobId?.company}</p>
//               </div>
//             )}

//             {/* Stats */}
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">{jobs.length}</h2>
//                 <p>Latest Jobs</p>
//               </div>

//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">
//                   {appliedCount}
//                 </h2>
//                 <p>Applications</p>
//               </div>

//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">
//                   {user?.resume ? "100%" : "60%"}
//                 </h2>
//                 <p>Profile</p>
//               </div>
//             </div>

//             <button
//               onClick={() => navigate("/jobs")}
//               className="mt-8 bg-blue-600 text-white px-6 py-2 rounded"
//             >
//               Browse Jobs
//             </button>

//             {/* Jobs */}
//             <div className="mt-10 grid md:grid-cols-3 gap-4">
//               {(jobs || []).map((job) => (
//                 <div key={job._id} className="bg-white p-4 shadow rounded">
//                   <h3 className="font-bold">{job.title}</h3>
//                   <p>{job.company}</p>
//                   <p>{job.location}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ================= RECRUITER ================= */}
//         {user?.role === "recruiter" && (
//           <>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">{jobs.length}</h2>
//                 <p>Total Jobs</p>
//               </div>

//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">Active</h2>
//                 <p>Status</p>
//               </div>

//               <div className="bg-white p-6 shadow rounded">
//                 <h2 className="text-2xl font-bold">Ready</h2>
//                 <p>Hiring</p>
//               </div>
//             </div>

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={() => navigate("/create-job")}
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//               >
//                 Create Job
//               </button>

//               <button
//                 onClick={() => navigate("/my-jobs")}
//                 className="bg-green-600 text-white px-6 py-2 rounded"
//               >
//                 My Jobs
//               </button>
//             </div>
//           </>
//         )}

//         {/* ================= ADMIN ================= */}
//         {user?.role === "admin" && (
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 shadow rounded">
//               <h2 className="text-2xl font-bold">Users</h2>
//             </div>

//             <div className="bg-white p-6 shadow rounded">
//               <h2 className="text-2xl font-bold">Jobs</h2>
//             </div>

//             <div className="bg-white p-6 shadow rounded">
//               <h2 className="text-2xl font-bold">Recruiters</h2>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CheckCircleIcon, 
  ClockIcon,
  BriefcaseIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [interview, setInterview] = useState(null);
  const [appliedCount, setAppliedCount] = useState(0);
  //const [stats, setStats] = useState({});

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

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
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Welcome Hero */}
          <div className="glass-card p-12 md:p-16 text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Welcome back, {user?.name || "User"}! 👋
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Here's your personalized dashboard with latest updates and quick actions
            </p>
          </div>

          {/* CANDIDATE DASHBOARD */}
          {user?.role === "candidate" && (
            <>
              {/* Upcoming Interview */}
              {interview && (
                <div className="glass-card p-8 md:p-10 mb-8 shadow-2xl shadow-blue-500/20">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                      <ClockIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-emerald-700">Upcoming Interview</h2>
                      <p className="text-emerald-600 font-semibold">{new Date(interview.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 text-lg">
                    <div>
                      <p className="text-gray-700 font-semibold">{interview?.jobId?.title}</p>
                      <p className="text-gray-600">{interview?.jobId?.company}</p>
                    </div>
                    <div className="text-right md:text-left">
                      <span className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-sm font-semibold">
                        Prepare Now
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass-card p-8 group hover:shadow-3xl hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform">
                    <BriefcaseIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{jobs.length}</h3>
                  <p className="text-xl text-gray-600 font-semibold">Latest Jobs</p>
                </div>

                <div className="glass-card p-8 group hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/40 group-hover:scale-110 transition-transform">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{appliedCount}</h3>
                  <p className="text-xl text-gray-600 font-semibold">Applications</p>
                </div>

                <div className="glass-card p-8 group hover:shadow-3xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                    <UserGroupIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{user?.resume ? "100%" : "60%"}</h3>
                  <p className="text-xl text-gray-600 font-semibold">Profile Complete</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => navigate("/jobs")}
                    className="
                      group relative overflow-hidden rounded-3xl py-8 px-8 text-xl font-bold
                      backdrop-blur-xl bg-gradient-to-r from-blue-500/95 to-indigo-600/95 text-white
                      shadow-2xl shadow-blue-500/40 border border-blue-200/50 hover:shadow-3xl hover:shadow-blue-500/60
                      hover:scale-[1.02] transition-all duration-300
                    "
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <BriefcaseIcon className="w-16 h-16 group-hover:scale-110 transition-transform" />
                      <span>Browse Jobs</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => navigate("/profile")}
                    className="
                      group relative overflow-hidden rounded-3xl py-8 px-8 text-xl font-bold
                      backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-green-600/95 text-white
                      shadow-2xl shadow-emerald-500/40 border border-emerald-200/50 hover:shadow-3xl hover:shadow-emerald-500/60
                      hover:scale-[1.02] transition-all duration-300
                    "
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <UserGroupIcon className="w-16 h-16 group-hover:scale-110 transition-transform" />
                      <span>Update Profile</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Jobs */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <ChartBarIcon className="w-12 h-12 text-indigo-500" />
                  <span>Recent Jobs</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {(jobs.slice(0, 6) || []).map((job) => (
                    <div key={job._id} className="group p-6 rounded-2xl backdrop-blur-sm bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 border border-white/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-lg font-semibold text-indigo-600 mb-3">{job.company}</p>
                      <p className="text-gray-600 mb-4">{job.location}</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 text-sm font-semibold">
                        {job.jobType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* RECRUITER DASHBOARD */}
          {user?.role === "recruiter" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card p-10">
                  <h2 className="text-3xl font-bold mb-8">Your Hiring Pipeline</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-8 rounded-2xl bg-white/50">
                      <div className="text-4xl font-bold text-indigo-600 mb-2">{jobs.length}</div>
                      <p className="text-xl text-gray-600 font-semibold">Total Jobs Posted</p>
                    </div>
                    <div className="text-center p-8 rounded-2xl bg-white/50">
                      <div className="text-4xl font-bold text-emerald-600 mb-2">Active</div>
                      <p className="text-xl text-gray-600 font-semibold">Open Positions</p>
                    </div>
                    <div className="text-center p-8 rounded-2xl bg-white/50">
                      <div className="text-4xl font-bold text-purple-600 mb-2">Ready</div>
                      <p className="text-xl text-gray-600 font-semibold">To Hire</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <button
                  onClick={() => navigate("/create-job")}
                  className="
                    w-full h-32 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-blue-500/95 to-indigo-600/95
                    text-2xl font-bold text-white shadow-2xl shadow-blue-500/40 hover:shadow-3xl hover:shadow-blue-500/60
                    hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center
                  "
                >
                  <BuildingOfficeIcon className="w-16 h-16 mb-3" />
                  Create Job
                </button>
                <button
                  onClick={() => navigate("/my-jobs")}
                  className="
                    w-full h-32 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-emerald-500/95 to-green-600/95
                    text-2xl font-bold text-white shadow-2xl shadow-emerald-500/40 hover:shadow-3xl hover:shadow-emerald-500/60
                    hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center
                  "
                >
                  <ChartBarIcon className="w-16 h-16 mb-3" />
                  My Jobs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;