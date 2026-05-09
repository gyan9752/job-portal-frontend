import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Profile = () => {
  const [file, setFile] = useState(null);

  const uploadResume = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post(
        "/upload/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume Uploaded Successfully ✅");
      console.log(res.data);

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Upload Resume
          </h1>

          <form onSubmit={uploadResume} className="space-y-4">
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="w-full border p-3 rounded"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded">
              Upload Resume
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;