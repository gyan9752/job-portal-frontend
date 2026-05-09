import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/resetpassword/verify-otp", {
        email,
        otp,
      });

      setMessage(res.data.message);

    //   setTimeout(() => {
    //     navigate("/reset-password");
    //   }, 1000);

navigate("/reset-password", { replace: true });

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Verify OTP
        </h1>

        <form onSubmit={verifyHandler} className="space-y-4">

          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

export default VerifyOtp;