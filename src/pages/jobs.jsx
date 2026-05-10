// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import JobCard from "../components/jobCard";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);

// useEffect(() => {
//   const fetchJobs = async () => {
//     try {
//       const res = await API.get("/Jobs/all");
//       console.log("API DATA:", res.data);
//      setJobs(res.data.jobs || res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchJobs();
// }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>

//         <div className="grid md:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <JobCard key={job._id} job={job} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Jobs;

import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import JobCard from "../components/jobCard";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await API.get("/Jobs/all");

        setJobs(res.data.jobs || res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ✅ useMemo used instead of useEffect + setFilteredJobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return (
        title.includes(search) ||
        company.includes(search)
      );
    });
  }, [jobs, searchTerm]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
          <div className="glass-card p-20 text-center">
            <div className="w-24 h-24 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-8"></div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loading Jobs
            </h2>

            <p className="text-2xl text-gray-600">
              Discovering amazing opportunities...
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="glass-card p-12 mb-12 shadow-2xl shadow-black/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                  Job Openings
                </h1>

                <p className="text-2xl text-gray-700">
                  {filteredJobs.length} opportunities waiting for you
                </p>
              </div>

              {/* Search */}
              <div className="w-full md:w-auto">
                <div className="relative max-w-md mx-auto md:ml-auto">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

                  <input
                    type="text"
                    placeholder="Search by job title or company..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    className="
                      w-full pl-12 pr-6 py-5 rounded-3xl backdrop-blur-xl bg-white/70
                      border border-white/50 shadow-xl focus:ring-4 focus:ring-indigo-500/30
                      focus:border-indigo-500/60 transition-all duration-300 text-lg
                      placeholder-gray-500
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card p-6 mb-12 shadow-xl shadow-black/10">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="w-6 h-6 text-gray-500" />

              <span className="font-semibold text-lg text-gray-700">
                Filters
              </span>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="col-span-full glass-card p-20 text-center shadow-2xl shadow-black/10">
                <BriefcaseIcon className="w-32 h-32 text-gray-300 mx-auto mb-8" />

                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  No jobs found
                </h3>

                <p className="text-2xl text-gray-600 mb-12">
                  Try adjusting your search or filters
                </p>

                <button
                  onClick={() => setSearchTerm("")}
                  className="
                    px-12 py-5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white
                    font-bold text-xl rounded-3xl shadow-2xl shadow-indigo-500/50
                    hover:from-indigo-600 hover:to-blue-700 hover:shadow-3xl hover:shadow-indigo-500/70
                    hover:scale-105 transition-all duration-300
                  "
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;