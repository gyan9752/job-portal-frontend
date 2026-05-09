import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

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

  /* ================= LOAD JOB ================= */
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

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= UPDATE JOB ================= */
  const updateJob = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);

      await API.put(`/Jobs/${id}`, {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      alert("Job Updated Successfully");
      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert("Failed to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Edit Job
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading...
            </p>
          ) : (
            <form onSubmit={updateJob} className="space-y-4">
              {/* Title */}
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full border p-3 rounded"
                required
              />

              {/* Company */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full border p-3 rounded"
                required
              />

              {/* Location */}
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-3 rounded"
                required
              />

              {/* Salary */}
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="w-full border p-3 rounded"
              />

              {/* Job Type */}
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>

              {/* Experience */}
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">Experience Level</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>

              {/* Skills */}
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (React, Node, MongoDB)"
                className="w-full border p-3 rounded"
              />

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                rows="5"
                className="w-full border p-3 rounded"
              />

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                >
                  {btnLoading
                    ? "Updating..."
                    : "Update Job"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my-jobs")}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditJob;