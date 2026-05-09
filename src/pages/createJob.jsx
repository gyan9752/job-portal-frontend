import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // title,company,location,jobType,experienceLevel
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

    try {
      await API.post("/Jobs/create", formData);
      alert("Job Created Successfully");
      navigate("/jobs");
    } catch (error) {
      console.log(error);
      alert("Failed to create job");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create New Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Job Title"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />

            {/* <input
              type="text"
              name="jobType"
              placeholder="Job Type"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            /> */}
                <select
                  name="jobType"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>

            <select
              name="experienceLevel"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            >
              <option value="">Select Experience Level</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </select>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Create Job
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateJob;