// // src/pages/ForgotPassword.jsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const ForgotPassword = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [message, setMessage] =
//     useState("");
//   const [loading, setLoading] =
//     useState(false);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await API.post(
//         "/resetpassword/reset-password",
//         { email }
//       );

//       setMessage(res.data.message);

//       localStorage.setItem(
//         "resetEmail",
//         email
//       );

//       setTimeout(() => {
//         navigate("/verify-otp");
//       }, 1000);

//     } catch (error) {
//   console.log(error);
//   console.log(error.response);

//   setMessage(
//     error.response?.data?.message ||
//     "Something went wrong"
//   );
// }finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Forgot Password
//         </h1>

//         <form
//           onSubmit={submitHandler}
//           className="space-y-4"
//         >
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) =>
//               setEmail(
//                 e.target.value
//               )
//             }
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <button
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg"
//           >
//             {loading
//               ? "Sending..."
//               : "Send OTP"}
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

// export default ForgotPassword;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { 
  EnvelopeIcon, 
  LockOpenIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/resetpassword/reset-password", { email });
      setMessage(res.data.message);
      localStorage.setItem("resetEmail", email);
      setTimeout(() => navigate("/verify-otp"), 1500);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Hero Card */}
        <div className="glass-card p-10 md:p-12 text-center mb-8 shadow-2xl shadow-black/10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
            <LockOpenIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Forgot Password?
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 md:p-10 shadow-2xl shadow-black/10">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 text-left">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full pl-12 pr-5 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 
                    shadow-lg focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/60 
                    transition-all duration-300 text-lg placeholder-gray-500
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="
                w-full relative overflow-hidden rounded-3xl py-6 px-8 text-xl font-bold
                backdrop-blur-xl bg-gradient-to-r from-indigo-500/95 to-blue-600/95 text-white
                shadow-2xl shadow-indigo-500/40 border border-indigo-200/50
                hover:from-indigo-600 hover:to-blue-700 hover:shadow-3xl hover:shadow-indigo-500/60
                hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                group after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/30 after:to-transparent
                after:opacity-0 group-hover:after:opacity-100 after:transition-all after:duration-300
              "
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {message && (
            <div className={`
              mt-8 p-6 rounded-2xl backdrop-blur-sm shadow-xl border text-center text-lg font-semibold
              ${message.includes('wrong') ? 
                'bg-rose-100/80 border-rose-200/50 text-rose-800 shadow-rose-500/20' : 
                'bg-emerald-100/80 border-emerald-200/50 text-emerald-800 shadow-emerald-500/20'
              }
              transition-all duration-300
            `}>
              {message}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/login')}
              className="
                text-indigo-600 hover:text-indigo-700 font-semibold text-lg
                backdrop-blur-sm bg-white/60 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl
                hover:bg-white/80 transition-all duration-300 border border-indigo-200/50
              "
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;