// src/pages/ForgotPassword.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/resetpassword/reset-password",
        { email }
      );

      setMessage(res.data.message);

      localStorage.setItem(
        "resetEmail",
        email
      );

      setTimeout(() => {
        navigate("/verify-otp");
      }, 1000);

    } catch (error) {
  console.log(error);
  console.log(error.response);

  setMessage(
    error.response?.data?.message ||
    "Something went wrong"
  );
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send OTP"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;