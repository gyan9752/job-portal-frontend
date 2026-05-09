
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/Jobs/all");

        console.log("FULL RESPONSE:", res.data);

        const user = JSON.parse(localStorage.getItem("user"));
        console.log("USER:", user);

        const allJobs = res.data.jobs || [];

        const myJobs = allJobs.filter((job) => {
  const createdById =
    job.createdBy?._id || job.createdBy;

  return String(createdById) === String(user.id);
});

        console.log("MY JOBS:", myJobs);

        setJobs(myJobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-bold">My Jobs</h1>

          <button
            onClick={() => navigate("/create-job")}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Create Job
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-2xl font-bold text-blue-700">
                  {job.title}
                </h2>

                <p>{job.company}</p>
                <p>{job.location}</p>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;