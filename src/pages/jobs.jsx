import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import JobCard from "../components/jobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await API.get("/Jobs/all");
      console.log("API DATA:", res.data);
     setJobs(res.data.jobs || res.data);
      console.log(res.data);
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
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;