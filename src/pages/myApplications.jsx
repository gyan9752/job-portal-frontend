// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/Jobs/my-applications");
//       setApplications(res.data.applications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await fetchApplications();
//     })();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8">
//           My Applications
//         </h1>

//         <div className="grid md:grid-cols-3 gap-6">
//           {applications.length > 0 ? (
//             applications.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow rounded-xl p-6"
//               >
//                 <h2 className="text-2xl font-bold text-blue-700">
//                   {item.jobId?.title}
//                 </h2>

//                 <p className="mt-2">{item.jobId?.company}</p>

//                 <p>{item.jobId?.location}</p>

//                 <p className="mt-3">
//                   Status:
//                   <span className="ml-2 font-bold text-green-600">
//                     {item.status}
//                   </span>
//                 </p>

//                 <p className="text-sm text-gray-500 mt-2">
//                   Applied On:
//                   {" "}
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No Applications Found</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyApplications;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/Jobs/my-applications");
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchApplications();
    })();
  }, []);

  const badgeColor = (status) => {
    switch (status) {
      case "applied":
        return "text-yellow-600";
      case "shortlisted":
        return "text-blue-600";
      case "interview":
      case "interView":
        return "text-purple-600";
      case "hired":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">
          My Applications
        </h1>

        {loading ? (
          <div className="text-center text-lg font-semibold">
            Loading...
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            No Applications Found
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {applications.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-xl p-6"
              >
                {/* Job Info */}
                <h2 className="text-2xl font-bold text-blue-700">
                  {item.jobId?.title || item.jobTitle || "Job Title"}
                </h2>

                <p className="mt-2">
                  {item.jobId?.company ||
                    item.company ||
                    "Company"}
                </p>

                <p>
                  {item.jobId?.location ||
                    item.location ||
                    "Location"}
                </p>

                {/* Status */}
                <p className="mt-3">
                  Status:
                  <span
                    className={`ml-2 font-bold ${badgeColor(
                      item.status
                    )}`}
                  >
                    {item.status || "N/A"}
                  </span>
                </p>

                {/* Applied Date */}
                <p className="text-sm text-gray-500 mt-2">
                  Applied On:{" "}
                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                {/* Interview Section */}
                {(item.status === "interview" ||
                  item.status === "interView") &&
                  item?.interView?.scheduleAt && (
                    <div className="mt-5 bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-bold text-purple-700 mb-3">
                        Interview Scheduled
                      </h3>

                      <p className="text-sm mb-2">
                        <span className="font-semibold">
                          Date:
                        </span>{" "}
                        {new Date(
                          item.interView.scheduleAt
                        ).toLocaleString()}
                      </p>

                      <p className="text-sm mb-2">
                        <span className="font-semibold">
                          Mode:
                        </span>{" "}
                        {item?.interView?.mode ||
                          "N/A"}
                      </p>

                      {item?.interView?.mode ===
                        "online" &&
                        item?.interView
                          ?.meetingLink && (
                          <a
                            href={
                              item.interView
                                .meetingLink
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline text-sm"
                          >
                            Join Interview
                          </a>
                        )}

                      {item?.interView?.mode ===
                        "offline" && (
                        <p className="text-sm">
                          <span className="font-semibold">
                            Location:
                          </span>{" "}
                          {item?.interView
                            ?.location || "N/A"}
                        </p>
                      )}

                      {item?.interView?.note && (
                        <p className="text-sm mt-2">
                          <span className="font-semibold">
                            Note:
                          </span>{" "}
                          {item.interView.note}
                        </p>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyApplications;