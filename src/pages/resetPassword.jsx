import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, []);

  const resetHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/resetpassword/reset-password-final",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message);

      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Reset Password
        </h1>

        <form onSubmit={resetHandler} className="space-y-4">

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Update Password
          </button>

        </form>

        {message && (
          <p className="text-center mt-4 text-green-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;