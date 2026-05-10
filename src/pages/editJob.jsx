// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const EditJob = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [btnLoading, setBtnLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     description: "",
//     jobType: "",
//     experienceLevel: "",
//     skills: "",
//   });

//   /* ================= LOAD JOB ================= */
//   useEffect(() => {
//     const loadJob = async () => {
//       try {
//         const res = await API.get(`/Jobs/${id}`);

//         const job = res.data.job;

//         setFormData({
//           title: job.title || "",
//           company: job.company || "",
//           location: job.location || "",
//           salary: job.salary || "",
//           description: job.description || "",
//           jobType: job.jobType || "",
//           experienceLevel: job.experienceLevel || "",
//           skills: job.skills?.join(", ") || "",
//         });
//       } catch (error) {
//         console.log(error);
//         alert("Failed to load job");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadJob();
//   }, [id]);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   /* ================= UPDATE JOB ================= */
//   const updateJob = async (e) => {
//     e.preventDefault();

//     try {
//       setBtnLoading(true);

//       await API.put(`/Jobs/${id}`, {
//         ...formData,
//         skills: formData.skills
//           .split(",")
//           .map((item) => item.trim())
//           .filter(Boolean),
//       });

//       alert("Job Updated Successfully");
//       navigate("/my-jobs");
//     } catch (error) {
//       console.log(error);
//       alert("Failed to update job");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//         <div className="bg-white p-8 rounded-xl shadow w-full max-w-2xl">
//           <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//             Edit Job
//           </h1>

//           {loading ? (
//             <p className="text-center text-gray-500">
//               Loading...
//             </p>
//           ) : (
//             <form onSubmit={updateJob} className="space-y-4">
//               {/* Title */}
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Job Title"
//                 className="w-full border p-3 rounded"
//                 required
//               />

//               {/* Company */}
//               <input
//                 type="text"
//                 name="company"
//                 value={formData.company}
//                 onChange={handleChange}
//                 placeholder="Company Name"
//                 className="w-full border p-3 rounded"
//                 required
//               />

//               {/* Location */}
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="Location"
//                 className="w-full border p-3 rounded"
//                 required
//               />

//               {/* Salary */}
//               <input
//                 type="text"
//                 name="salary"
//                 value={formData.salary}
//                 onChange={handleChange}
//                 placeholder="Salary"
//                 className="w-full border p-3 rounded"
//               />

//               {/* Job Type */}
//               <select
//                 name="jobType"
//                 value={formData.jobType}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded"
//               >
//                 <option value="">Select Job Type</option>
//                 <option value="Full-Time">Full-Time</option>
//                 <option value="Part-Time">Part-Time</option>
//                 <option value="Remote">Remote</option>
//                 <option value="Internship">Internship</option>
//               </select>

//               {/* Experience */}
//               <select
//                 name="experienceLevel"
//                 value={formData.experienceLevel}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded"
//               >
//                 <option value="">Experience Level</option>
//                 <option value="Fresher">Fresher</option>
//                 <option value="1 Year">1 Year</option>
//                 <option value="2 Years">2 Years</option>
//                 <option value="3+ Years">3+ Years</option>
//               </select>

//               {/* Skills */}
//               <input
//                 type="text"
//                 name="skills"
//                 value={formData.skills}
//                 onChange={handleChange}
//                 placeholder="Skills (React, Node, MongoDB)"
//                 className="w-full border p-3 rounded"
//               />

//               {/* Description */}
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Job Description"
//                 rows="5"
//                 className="w-full border p-3 rounded"
//               />

//               {/* Buttons */}
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   disabled={btnLoading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
//                 >
//                   {btnLoading
//                     ? "Updating..."
//                     : "Update Job"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => navigate("/my-jobs")}
//                   className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditJob;




import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { 
  PencilIcon, 
  BriefcaseIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "",
    experienceLevel: "",
    skills: "",
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await API.get(`/Jobs/${id}`);
        const job = res.data.job;
        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          salary: job.salary || "",
          description: job.description || "",
          jobType: job.jobType || "",
          experienceLevel: job.experienceLevel || "",
          skills: job.skills?.join(", ") || "",
        });
      } catch (error) {
        console.log(error);
        alert("Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateJob = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await API.put(`/Jobs/${id}`, {
        ...formData,
        skills: formData.skills.split(",").map((item) => item.trim()).filter(Boolean),
      });
      alert("Job Updated Successfully ✅");
      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert("Failed to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 border-4 border-indigo-200/50 border-t-indigo-500 rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-700">Loading Job Details...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="glass-card p-12 text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/40">
              <PencilIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-amber-900 bg-clip-text text-transparent mb-4">
              Edit Job Posting
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Update your job details to attract the right candidates
            </p>
          </div>

          {/* Edit Form */}
          <div className="glass-card p-8 md:p-12 shadow-2xl shadow-black/10">
            <form onSubmit={updateJob} className="space-y-8">
              
              {/* Row 1: Title & Company */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center space-x-2">
                    <BriefcaseIcon className="w-5 h-5 text-indigo-500" />
                    <span>Job Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Fullstack Developer"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-300 text-lg placeholder-gray-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center space-x-2">
                    <BuildingOfficeIcon className="w-5 h-5 text-purple-500" />
                    <span>Company</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. TechCorp Innovations"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-300 text-lg placeholder-gray-500 font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Location & Salary */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center space-x-2">
                    <MapPinIcon className="w-5 h-5 text-emerald-500" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote / New York, NY"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all duration-300 text-lg placeholder-gray-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center space-x-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-amber-500" />
                    <span>Salary (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. $80k - $120k / yr"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-amber-500/30 focus:border-amber-500/60 transition-all duration-300 text-lg placeholder-gray-500 font-semibold"
                  />
                </div>
              </div>

              {/* Row 3: Job Type & Experience */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all duration-300 text-lg font-semibold appearance-none"
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-green-500/30 focus:border-green-500/60 transition-all duration-300 text-lg font-semibold appearance-none"
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              {/* Skills & Description */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center space-x-2">
                    <ChatBubbleLeftIcon className="w-5 h-5 text-purple-500" />
                    <span>Required Skills</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, AWS"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-300 text-lg placeholder-gray-500 font-semibold"
                  />
                  <p className="text-xs text-gray-500 mt-2">Separate with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell candidates about this amazing opportunity..."
                    rows="6"
                    className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl shadow-black/10 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-300 text-lg placeholder-gray-500 resize-vertical font-medium"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="
                    flex-1 group relative overflow-hidden rounded-3xl py-5 px-8 text-xl font-bold
                    backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 via-green-600/95 to-emerald-700/95
                    text-white shadow-2xl shadow-emerald-500/40 border border-emerald-200/50
                    hover:from-emerald-600 hover:via-green-700 hover:to-emerald-800 hover:shadow-3xl hover:shadow-emerald-500/60
                    hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {btnLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating Job...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-7 h-7" />
                        <span>Update Job</span>
                      </>
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my-jobs")}
                  className="
                    flex-1 rounded-3xl py-5 px-8 text-xl font-bold backdrop-blur-xl
                    bg-gradient-to-r from-gray-400/90 to-gray-500/90 text-white shadow-xl shadow-gray-400/40
                    border border-gray-300/50 hover:from-gray-500 hover:to-gray-600 hover:shadow-2xl hover:shadow-gray-400/60
                    hover:scale-[1.02] transition-all duration-300
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJob;