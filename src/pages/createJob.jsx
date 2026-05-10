// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const CreateJob = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     // title,company,location,jobType,experienceLevel
//     title: "",
//     company: "",
//     location: "",
//     jobType: "",
//     experienceLevel: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/Jobs/create", formData);
//       alert("Job Created Successfully");
//       navigate("/jobs");
//     } catch (error) {
//       console.log(error);
//       alert("Failed to create job");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//         <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             Create New Job
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             <input
//               type="text"
//               name="title"
//               placeholder="Job Title"
//               className="w-full border p-3 rounded"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="company"
//               placeholder="Company Name"
//               className="w-full border p-3 rounded"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               className="w-full border p-3 rounded"
//               onChange={handleChange}
//             />

//             {/* <input
//               type="text"
//               name="jobType"
//               placeholder="Job Type"
//               className="w-full border p-3 rounded"
//               onChange={handleChange}
//             /> */}
//                 <select
//                   name="jobType"
//                   className="w-full border p-3 rounded"
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Job Type</option>
//                   <option value="full-time">Full-time</option>
//                   <option value="part-time">Part-time</option>
//                   <option value="contract">Contract</option>
//                     <option value="internship">Internship</option>
//                 </select>

//             <select
//               name="experienceLevel"
//               className="w-full border p-3 rounded"
//               onChange={handleChange}
//             >
//               <option value="">Select Experience Level</option>
//               <option value="fresher">Fresher</option>
//               <option value="junior">Junior</option>
//               <option value="senior">Senior</option>
//             </select>

//             <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
//               Create Job
//             </button>

//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateJob;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { BriefcaseIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const CreateJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experienceLevel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await API.post("/Jobs/create", formData);
      alert("Job Created Successfully ✅");
      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert("Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Card */}
          <div className="glass-card p-12 text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
              <BriefcaseIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Create New Job
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Fill in the details to post your job opening and attract top talent
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card p-8 md:p-12 shadow-2xl shadow-black/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior React Developer"
                  className="w-full px-5 py-4 rounded-2xl backdrop-blur-sm bg-white/70 border border-white/40 shadow-lg shadow-black/5 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300 text-lg placeholder-gray-500"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  className="w-full px-5 py-4 rounded-2xl backdrop-blur-sm bg-white/70 border border-white/40 shadow-lg shadow-black/5 focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-300 text-lg placeholder-gray-500"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                  <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Remote / New York"
                      className="w-full pl-12 pr-5 py-4 rounded-2xl backdrop-blur-sm bg-white/70 border border-white/40 shadow-lg shadow-black/5 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 text-lg placeholder-gray-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Job Type</label>
                  <select
                    name="jobType"
                    className="w-full px-5 py-4 rounded-2xl backdrop-blur-sm bg-white/70 border border-white/40 shadow-lg shadow-black/5 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-300 text-lg appearance-none bg-no-repeat bg-right"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Experience Level</label>
                <select
                  name="experienceLevel"
                  className="w-full px-5 py-4 rounded-2xl backdrop-blur-sm bg-white/70 border border-white/40 shadow-lg shadow-black/5 focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all duration-300 text-lg appearance-none bg-no-repeat bg-right"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid-level">Mid-level (2-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full relative overflow-hidden rounded-3xl py-6 px-8 text-xl font-bold
                  backdrop-blur-xl bg-gradient-to-r from-indigo-500/95 via-purple-600/95 to-blue-600/95
                  text-white shadow-2xl shadow-indigo-500/40 border border-indigo-200/50
                  hover:from-indigo-600 hover:via-purple-700 hover:to-blue-700
                  hover:shadow-3xl hover:shadow-indigo-500/60 hover:scale-[1.02]
                  transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                  group after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/30 after:to-transparent
                  after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-300
                "
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Job...</span>
                    </>
                  ) : (
                    <>
                      <BuildingOfficeIcon className="w-7 h-7" />
                      <span>Post Job Now</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;