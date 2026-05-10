// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const VerifyOtp = () => {
//   const navigate = useNavigate();

//   const email = localStorage.getItem("resetEmail");

//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const verifyHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await API.post("/resetpassword/verify-otp", {
//         email,
//         otp,
//       });

//       setMessage(res.data.message);

//     //   setTimeout(() => {
//     //     navigate("/reset-password");
//     //   }, 1000);

// navigate("/reset-password", { replace: true });

//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//         "Invalid OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Verify OTP
//         </h1>

//         <form onSubmit={verifyHandler} className="space-y-4">

//           <input
//             type="text"
//             placeholder="Enter 6 Digit OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <button
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//         </form>

//         {message && (
//           <p className="text-center mt-4 text-sm text-green-600">
//             {message}
//           </p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;


import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';

import {
  useSearchParams,
  useNavigate
} from 'react-router-dom';

import {
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

  const [otp, setOtp] = useState([
    '',
    '',
    '',
    '',
    '',
    ''
  ]);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const inputRefs = useRef([]);

  /* =========================
     Derived State
  ========================= */

  const canResend = timeLeft === 0;

  const isComplete = otp.every(
    (digit) => digit !== ''
  );

  /* =========================
     Timer Effect
  ========================= */

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  /* =========================
     Verify OTP
  ========================= */

  const handleVerify = useCallback(async () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter full 6-digit code');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        '/api/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            otp: otpCode
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          'token',
          data.token
        );

        navigate('/dashboard');
      } else {
        setError(
          data.message || 'Invalid OTP'
        );

        setOtp([
          '',
          '',
          '',
          '',
          '',
          ''
        ]);

        inputRefs.current[0]?.focus();
      }
    } catch {
      setError(
        'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [otp, email, navigate]);

  /* =========================
     OTP Change
  ========================= */

  const handleOtpChange = useCallback(
    (value, index) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];

      newOtp[index] = value.slice(-1);

      setOtp(newOtp);

      setError('');

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  /* =========================
     Keyboard Handling
  ========================= */

  const handleKeyDown = useCallback(
    (e, index) => {
      if (
        e.key === 'Backspace' &&
        !otp[index] &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === 'Enter') {
        handleVerify();
      }
    },
    [otp, handleVerify]
  );

  /* =========================
     Paste OTP
  ========================= */

  const handlePaste = useCallback((e) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    const newOtp = pastedOtp
      .split('')
      .concat(
        Array(6 - pastedOtp.length).fill('')
      );

    setOtp(newOtp);

    setTimeout(() => {
      inputRefs.current[5]?.focus();
    }, 10);
  }, []);

  /* =========================
     Resend OTP
  ========================= */

  const handleResend = async () => {
    setResendLoading(true);

    try {
      await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      setMessage(
        'New OTP sent to your email!'
      );

      setError('');

      setOtp([
        '',
        '',
        '',
        '',
        '',
        ''
      ]);

      setTimeLeft(60);

      inputRefs.current[0]?.focus();
    } catch {
      setError('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <ShieldCheckIcon className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Verify OTP
          </h1>

          <p className="text-lg text-gray-600">
            Enter the 6-digit code sent to{' '}
            <strong>{email}</strong>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8">

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <p className="text-green-700 flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                {message}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-red-700 text-center">
                {error}
              </p>
            </div>
          )}

          {/* OTP Inputs */}
          <div
            className="grid grid-cols-6 gap-3 mb-6"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-full h-14 border-2 border-gray-300 rounded-2xl text-center text-2xl font-bold focus:border-indigo-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">

            <div className="flex items-center justify-center text-gray-500 mb-2">
              <ClockIcon className="h-4 w-4 mr-1" />

              <span>
                Resend code in {timeLeft}s
              </span>
            </div>

            <button
              onClick={handleResend}
              disabled={!canResend || resendLoading}
              className="text-indigo-600 font-semibold disabled:opacity-50"
            >
              <ArrowPathIcon className="h-4 w-4 inline mr-1" />

              {resendLoading
                ? 'Sending...'
                : 'Resend Code'}
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete || loading}
            className={`w-full py-4 rounded-2xl font-semibold transition-all ${
              isComplete && !loading
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading
              ? 'Verifying...'
              : 'Verify OTP'}
          </button>

          {/* Back */}
          <button
            onClick={() => navigate('/login')}
            className="w-full mt-4 border border-gray-300 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;