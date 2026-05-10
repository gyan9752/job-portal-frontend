// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const ResetPassword = () => {
//   const navigate = useNavigate();

//   const email = localStorage.getItem("resetEmail");

//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!email) {
//       navigate("/forgot-password");
//     }
//   }, []);

//   const resetHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post(
//         "/resetpassword/reset-password-final",
//         {
//           email,
//           newPassword,
//         }
//       );

//       setMessage(res.data.message);

//       localStorage.removeItem("resetEmail");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);

//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//         "Something went wrong"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Reset Password
//         </h1>

//         <form onSubmit={resetHandler} className="space-y-4">

//           <input
//             type="password"
//             placeholder="Enter New Password"
//             value={newPassword}
//             onChange={(e) =>
//               setNewPassword(e.target.value)
//             }
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
//             Update Password
//           </button>

//         </form>

//         {message && (
//           <p className="text-center mt-4 text-green-600">
//             {message}
//           </p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  LockClosedIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'success'

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase letter, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          email, 
          password: formData.password 
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setStep('success');
        setMessage(data.message || 'Password reset successfully!');
      } else {
        setErrors({ general: data.message || 'Invalid or expired token' });
      }
    } catch (error) {
        console.error(error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
              <CheckCircleIcon className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              Password Reset!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-sm mx-auto">
              {message}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:from-emerald-700 hover:to-green-700"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-white border-2 border-gray-200 text-gray-900 py-4 px-8 rounded-2xl text-lg font-semibold hover:shadow-lg hover:border-gray-300 transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <LockClosedIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Reset Password
          </h1>
          <p className="text-xl text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50">
          {!token || !email ? (
            <div className="text-center py-16">
              <LockClosedIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h3>
              <p className="text-gray-600 mb-8">
                The password reset link is invalid or has expired.
              </p>
              <button
                onClick={() => navigate('/forgotpassword')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Request New Link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <p className="text-red-800 font-medium">{errors.general}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <LockClosedIcon className="h-5 w-5 mr-2 text-indigo-500" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 pr-12 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 text-lg ${
                      errors.password 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200 hover:border-indigo-300 focus:border-indigo-500'
                    }`}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L19.5 19.5M15.737 9.878a3 3 0 114.243-4.243" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 pr-12 border-2 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 text-lg ${
                      errors.confirmPassword 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200 hover:border-indigo-300 focus:border-indigo-500'
                    }`}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 px-8 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                      <path fill="none" opacity=".3" d="M12 2v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="h-6 w-6" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>

              <div className="pt-6 text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;