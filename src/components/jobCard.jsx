// const JobCard = ({ job }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6 border">
//       <h2 className="text-xl font-bold text-blue-700">{job.title}</h2>

//       <p className="text-gray-600 mt-2">{job.company}</p>

//       <p className="mt-3 text-sm">{job.description}</p>

//       <div className="mt-4 flex justify-between items-center">
//         <span className="text-green-600 font-bold">
//           ₹ {job.salary}
//         </span>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;

import API from "../services/api";

const JobCard = ({ job }) => {
  const applyJob = async () => {
    try {
      const res = await API.post(`/Jobs/${job._id}/apply`);

      alert("Applied Successfully ✅");
      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Already applied / Failed"
      );
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-xl font-bold text-blue-700">
        {job.title}
      </h2>

      <p className="text-gray-600 mt-2">{job.company}</p>

      <p className="mt-3">{job.location}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-green-600 font-bold">
          {job.jobType}
        </span>

        <button
          onClick={applyJob}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;