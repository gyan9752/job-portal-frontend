// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           Recruiter Dashboard 👔
//         </h1>

//         <div className="grid md:grid-cols-3 gap-6">

//           <div
//             onClick={() => navigate("/create-job")}
//             className="bg-white p-6 rounded-xl shadow cursor-pointer"
//           >
//             <h2 className="text-2xl font-bold">Create Job</h2>
//             <p>Add new job opening</p>
//           </div>

//           <div
//             onClick={() => navigate("/my-jobs")}
//             className="bg-white p-6 rounded-xl shadow cursor-pointer"
//           >
//             <h2 className="text-2xl font-bold">My Jobs</h2>
//             <p>Edit / Delete jobs</p>
//           </div>

//           <div
//             onClick={() => navigate("/job-applications")}
//             className="bg-white p-6 rounded-xl shadow cursor-pointer"
//           >
//             <h2 className="text-2xl font-bold">Applications</h2>
//             <p>Manage candidates</p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default RecruiterDashboard;




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

/* =========================
   Stat Card Component
========================= */
const StatCard = ({
  icon,
  title,
  value,
  change,
  colorClasses
}) => {
  const IconComponent = icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">

      <div className="flex items-center">

        <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
          <IconComponent
            className={`h-6 w-6 ${colorClasses.text}`}
          />
        </div>

        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {value}
          </p>

          {change !== undefined && (
            <p
              className={`text-sm font-medium ${
                change >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {change >= 0 ? '+' : ''}
              {change}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    interviewsScheduled: 0
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] =
    useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================
     useEffect
  ========================= */
  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [jobsRes, appsRes] = await Promise.all([
          fetch('/api/recruiter/dashboard/jobs', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'token'
              )}`
            }
          }),

          fetch('/api/recruiter/dashboard/applications', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'token'
              )}`
            }
          })
        ]);

        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();

        if (!ignore) {
          setStats({
            totalJobs: jobsData.totalJobs || 0,
            totalApplications:
              appsData.totalApplications || 0,
            shortlisted:
              appsData.shortlisted || 0,
            interviewsScheduled:
              appsData.interviewsScheduled || 0
          });

          setRecentJobs(
            jobsData.recentJobs || []
          );

          setRecentApplications(
            appsData.recentApplications || []
          );

          setLoading(false);
        }
      } catch (error) {
        console.error(
          'Error fetching dashboard data:',
          error
        );

        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  /* =========================
     Loading State
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          <div className="animate-pulse space-y-8">

            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl h-24"
                ></div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <div className="bg-white p-8 rounded-xl h-80"></div>

              <div className="bg-white p-8 rounded-xl h-80"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Recruiter Dashboard
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl">
            Manage your job postings and applications
            with real-time insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            icon={DocumentTextIcon}
            title="Total Jobs"
            value={stats.totalJobs}
            colorClasses={{
              bg: 'bg-indigo-50',
              text: 'text-indigo-600'
            }}
          />

          <StatCard
            icon={UserGroupIcon}
            title="Applications"
            value={stats.totalApplications}
            change={12}
            colorClasses={{
              bg: 'bg-purple-50',
              text: 'text-purple-600'
            }}
          />

          <StatCard
            icon={CheckCircleIcon}
            title="Shortlisted"
            value={stats.shortlisted}
            change={8}
            colorClasses={{
              bg: 'bg-green-50',
              text: 'text-green-600'
            }}
          />

          <StatCard
            icon={ClockIcon}
            title="Interviews"
            value={stats.interviewsScheduled}
            change={25}
            colorClasses={{
              bg: 'bg-blue-50',
              text: 'text-blue-600'
            }}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Jobs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold flex items-center space-x-2">

                    <DocumentTextIcon className="h-6 w-6" />

                    <span>Recent Jobs</span>
                  </h2>

                  <p className="text-indigo-100 text-sm mt-1">
                    Your active job postings
                  </p>
                </div>

                <Link
                  to="/myjobs"
                  className="text-indigo-200 hover:text-white text-sm"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">

              {recentJobs.length === 0 ? (
                <div className="text-center py-12">

                  <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />

                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No jobs yet
                  </h3>

                  <Link
                    to="/createjob"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Create Job
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">

                  {recentJobs.map((job) => (
                    <Link
                      key={job._id}
                      to={`/jobs/${job._id}`}
                      className="block p-6 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        {job.location} • {job.jobType}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold flex items-center space-x-2">

                    <UserGroupIcon className="h-6 w-6" />

                    <span>Recent Applications</span>
                  </h2>

                  <p className="text-emerald-100 text-sm mt-1">
                    Latest applications to review
                  </p>
                </div>

                <Link
                  to="/applications"
                  className="text-emerald-200 hover:text-white text-sm"
                >
                  View All
                </Link>
              </div>
            </div>

            <div className="p-6">

              {recentApplications.length === 0 ? (
                <div className="text-center py-12">

                  <UserGroupIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />

                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No applications yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">

                  {recentApplications.map((app) => (
                    <Link
                      key={app._id}
                      to={`/recruiter-application/${app._id}`}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                    >
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-4">

                        {app?.candidate?.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {app?.candidate?.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {app?.job?.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            to="/createjob"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-bold mb-2 text-center">
              Create New Job
            </h3>

            <p className="text-center">
              Post a new job opportunity
            </p>
          </Link>

          <Link
            to="/myjobs"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-bold mb-2 text-center">
              Manage Jobs
            </h3>

            <p className="text-center">
              View & edit your postings
            </p>
          </Link>

          <button
            onClick={() =>
              navigate('/applications')
            }
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-bold mb-2 text-center">
              Review Applications
            </h3>

            <p className="text-center">
              Check new applications
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;