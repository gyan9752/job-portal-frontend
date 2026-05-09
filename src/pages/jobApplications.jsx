
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// const JobApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/recruiter/applications");
//       setApplications(res.data.applications || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put("/Jobs/application/status", {
//         applicationId: id,
//         status,
//       });

//       fetchApplications();
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed");
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchApplications();
//     })();
//   }, []);

//   const badgeColor = (status) => {
//     if (status === "shortlisted") return "text-blue-700";
//     if (status === "hired") return "text-green-700";
//     if (status === "rejected") return "text-red-700";
//     if (status === "interView") return "text-purple-700";
//     return "text-yellow-700";
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           Job Applications
//         </h1>

//         <div className="space-y-5">
//           {applications.length > 0 ? (
//             applications.map((item) => (
                  
//               <div
//                 key={item._id}
//                 className="bg-white p-6 rounded-xl shadow"
//               >
//                 <h2 className="text-2xl font-bold">
//                   {item.userId?.name}
//                 </h2>

//                 <p>{item.userId?.email}</p>

//                 <p className="mt-2">
//                   Applied For: {item.jobId?.title}
//                 </p>

//                 <p
//                   className={`mt-2 font-semibold ${badgeColor(
//                     item.status
//                   )}`}
//                 >
//                   Status: {item.status}
//                 </p>

//                 <div className="mt-4 flex gap-3 flex-wrap">
//                   <button
//                     onClick={() =>
//                       updateStatus(item._id, "shortlisted")
//                     }
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                   >
//                     Shortlist
//                   </button>

//                   <button
//                     onClick={() =>
//                       navigate("/recruiter-applications")
//                     }
//                     className="bg-yellow-500 text-white px-4 py-2 rounded"
//                   >
//                     Interview
//                   </button>

//                   <button
//                     onClick={() =>
//                       updateStatus(item._id, "hired")
//                     }
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Hire
//                   </button>

//                   <button
//                     onClick={() =>
//                       updateStatus(item._id, "rejected")
//                     }
//                     className="bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     Reject
//                   </button>

//                    <a
//   href={`http://localhost:5000${item.resume}`}
//   target="_blank"
//   rel="noreferrer"
//   className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
// >
//   Resume
// </a>
               
//                 </div>
//               </div>
//             ))

//           ) : (
//             <div className="bg-white p-8 rounded-xl shadow text-center">
//               No applications found
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobApplications;


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const res = await API.get("/Jobs/recruiter/applications");

      console.log("API Response:", res.data);

      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put("/Jobs/application/status", {
        applicationId: id,
        status,
      });

      fetchApplications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApplications();
    })();
  }, []);

  const badgeColor = (status) => {
    if (status === "shortlisted") return "text-blue-700";
    if (status === "hired") return "text-green-700";
    if (status === "rejected") return "text-red-700";
    if (status === "interView") return "text-purple-700";
    return "text-yellow-700";
  };

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">
          Job Applications
        </h1>

        <div className="space-y-5">
          {applications.length > 0 ? (
            applications.map((item) => {

              console.log("Single Item:", item);
              console.log("Resume from item:", item.resume);
              console.log("Resume from userId:", item.userId?.resume);

              return (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-2xl font-bold">
                    {item.userId?.name}
                  </h2>

                  <p>{item.userId?.email}</p>

                  <p className="mt-2">
                    Applied For: {item.jobId?.title}
                  </p>

                  <p
                    className={`mt-2 font-semibold ${badgeColor(
                      item.status
                    )}`}
                  >
                    Status: {item.status}
                  </p>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() =>
                        updateStatus(item._id, "shortlisted")
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        navigate("/recruiter-applications")
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Interview
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item._id, "hired")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Hire
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item._id, "rejected")
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>

                      {/* <p className="text-sm text-red-500">
  {item.userId?.resume}
</p> */}
                    <a
                      href={`http://localhost:8080${item.userId?.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
                    >
                      Resume
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              No applications found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplications;