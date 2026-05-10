// import { useState } from "react"
// import axios from "axios"

// function Register() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("candidate")

//   const handleRegister = async (e) => {
//     e.preventDefault()

//     try {
//       await axios.post(
//         "http://localhost:8080/api/User/register",
//         {
//         name, email, password, role
//         }
//       )

//       alert("Registration Success")
//       window.location.href = "/login"

//     } catch (error) {
//       console.log(error)
//       alert("Registration Failed")
//     }
//   }

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-96">
//         <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
//           Register
//         </h2>

//         <form onSubmit={handleRegister} className="space-y-4">

//           <input
//             type="text"
//             placeholder="Enter Name"
//             className="w-full border p-3 rounded-lg"
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="email"
//             placeholder="Enter Email"
//             className="w-full border p-3 rounded-lg"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Enter Password"
//             className="w-full border p-3 rounded-lg"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//             <select
//             value={role}
//               className="w-full border p-3 rounded-lg"
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="candidate">Candidate</option>
//               <option value="admin">Admin</option>
//                 <option value="recruiter">Recruiter</option>
//             </select>

//           <button className="w-full bg-green-600 text-white py-3 rounded-lg">
//             Register
//           </button>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

/* =========================
   Role Toggle Component
========================= */
const RoleToggle = () => {
  return (
    <div className="relative mb-8">

      <div
        className="absolute inset-0 flex items-center"
        aria-hidden="true"
      >
        <div className="w-full border-t border-gray-300" />
      </div>

      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500 font-medium">
          Register as
        </span>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    role: 'recruiter'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] =
    useState(false);

  /* =========================
     Validation Step 1
  ========================= */
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (
      !/^\d{10}$/.test(
        formData.phone.replace(/\D/g, '')
      )
    ) {
      newErrors.phone =
        'Phone must be 10 digits';
    }

    return newErrors;
  };

  /* =========================
     Validation Step 2
  ========================= */
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company =
        'Company name is required';
    }

    if (formData.password.length < 8) {
      newErrors.password =
        'Password must be at least 8 characters';
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
        formData.password
      )
    ) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number';
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        'Passwords do not match';
    }

    return newErrors;
  };

  /* =========================
     Handle Input Change
  ========================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /* =========================
     Next Step
  ========================= */
  const handleNextStep = (e) => {
    e.preventDefault();

    const stepErrors = validateStep1();

    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
    } else {
      setErrors(stepErrors);
    }
  };

  /* =========================
     Previous Step
  ========================= */
  const handlePreviousStep = () => {
    setStep(1);
    setErrors({});
  };

  /* =========================
     Submit Form
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stepErrors = validateStep2();

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        '/api/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(formData)
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
        setErrors({
          general:
            data.message ||
            'Registration failed'
        });
      }
    } catch {
      setErrors({
        general:
          'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md mx-auto">

        {/* Branding */}
        <div className="text-center mb-12">

          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">

            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Welcome to HirePro
          </h1>

          <p className="text-xl text-gray-600">
            Create your account to get started
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50">

          <form
            onSubmit={
              step === 1
                ? handleNextStep
                : handleSubmit
            }
            className="space-y-6"
          >

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <RoleToggle />

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">

                    <UserIcon className="h-5 w-5 mr-2 text-indigo-500" />

                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.name
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">

                    <EnvelopeIcon className="h-5 w-5 mr-2 text-indigo-500" />

                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.email
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">

                    <PhoneIcon className="h-5 w-5 mr-2 text-indigo-500" />

                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit phone"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.phone
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold"
                >
                  Next Step →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">

                    <BuildingOfficeIcon className="h-5 w-5 mr-2 text-indigo-500" />

                    Company Name
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.company
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.company && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">

                    <LockClosedIcon className="h-5 w-5 mr-2 text-indigo-500" />

                    Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.password
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Confirm Password
                  </label>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className={`w-full px-5 py-4 border-2 rounded-2xl ${
                      errors.confirmPassword
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {
                        errors.confirmPassword
                      }
                    </p>
                  )}
                </div>

                {/* Show Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-sm text-indigo-600"
                >
                  {showPassword
                    ? 'Hide Password'
                    : 'Show Password'}
                </button>

                {/* Buttons */}
                <div className="flex gap-4">

                  <button
                    type="button"
                    onClick={
                      handlePreviousStep
                    }
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl"
                  >
                    ← Previous
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl"
                  >
                    {loading
                      ? 'Creating...'
                      : 'Create Account'}
                  </button>
                </div>
              </>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">

                <p className="text-red-700 text-sm">
                  {errors.general}
                </p>
              </div>
            )}

            {/* Login */}
            <div className="text-center pt-4">

              <p className="text-sm text-gray-600">
                Already have an account?{' '}

                <button
                  type="button"
                  onClick={() =>
                    navigate('/login')
                  }
                  className="font-semibold text-indigo-600"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;