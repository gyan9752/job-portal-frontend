import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">
          Recruiter Dashboard 👔
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div
            onClick={() => navigate("/create-job")}
            className="bg-white p-6 rounded-xl shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold">Create Job</h2>
            <p>Add new job opening</p>
          </div>

          <div
            onClick={() => navigate("/my-jobs")}
            className="bg-white p-6 rounded-xl shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold">My Jobs</h2>
            <p>Edit / Delete jobs</p>
          </div>

          <div
            onClick={() => navigate("/job-applications")}
            className="bg-white p-6 rounded-xl shadow cursor-pointer"
          >
            <h2 className="text-2xl font-bold">Applications</h2>
            <p>Manage candidates</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;