// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import axios from "axios"

// // function Login() {
// //   const navigate = useNavigate()
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")

// //   const handleLogin = async (e) => {
// //     e.preventDefault()
// // try {
// // //   const res = await axios.post(
// // //     "http://localhost:8080/api/User/login",
// // //     {
// // //       email,
// // //       password
// // //     }
// // //   )

// // // console.log("FULL RESPONSE:", res.data)
// // // console.log("USER:", res.data.user)

// // //   localStorage.setItem("token", res.data.token)
// // //   localStorage.setItem("user", JSON.stringify(res.data.user || res.data))

// // //   window.location.href = "/dashboard"

// // const res = await axios.post(
// //   "http://localhost:8080/api/User/login",
// //   { email, password }
// // )

// // console.log(res.data)

// // localStorage.setItem(
// //   "token",
// //   res.data.token || res.data.accessToken || res.data.userToken
// // )

// // localStorage.setItem(
// //   "user",
// //   JSON.stringify(res.data.user || res.data)
// // )

// // window.location.href = "/dashboard"

// // } catch (error) {
// //   console.log(error)
// // }
// //   }

// //   return (
// //     <div className="flex justify-center items-center h-screen bg-gray-100">
// //       <div className="bg-white shadow-lg rounded-xl p-8 w-96">
// //         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
// //           Login
// //         </h2>

// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <input
// //             type="email"
// //             placeholder="Enter Email"
// //             className="w-full border p-3 rounded-lg"
// //             onChange={(e) => setEmail(e.target.value)}
// //           />

// //           <input
// //             type="password"
// //             placeholder="Enter Password"
// //             className="w-full border p-3 rounded-lg"
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <div className="text-right mt-2">
// //   <span
// //     onClick={() => navigate("/forgot-password")}
// //     className="text-blue-600 cursor-pointer text-sm"
// //   >
// //     Forgot Password?
// //   </span>
// // </div>

// //           <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
// //             Login
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Login

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setErrorMsg("");

//       const res = await axios.post(
//         "http://localhost:8080/api/User/login",
//         {
//           email,
//           password,
//         }
//       );

//       console.log(res.data);

//       localStorage.setItem(
//         "token",
//         res.data.token ||
//           res.data.accessToken ||
//           res.data.userToken
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(
//           res.data.user || res.data
//         )
//       );

//       window.location.href = "/dashboard";
//     } catch (error) {
//       console.log(error);

//       setErrorMsg(
//         error.response?.data?.message ||
//           "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-96">

//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Login
//         </h2>

//         <form
//           onSubmit={handleLogin}
//           className="space-y-4"
//         >
//           <input
//             type="email"
//             placeholder="Enter Email"
//             className="w-full border p-3 rounded-lg"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//             required
//           />

//           <input
//             type="password"
//             placeholder="Enter Password"
//             className="w-full border p-3 rounded-lg"
//             value={password}
//             onChange={(e) =>
//               setPassword(e.target.value)
//             }
//             required
//           />

//           <div className="text-right">
//             <span
//               onClick={() =>
//                 navigate("/forgot-password")
//               }
//               className="text-blue-600 cursor-pointer text-sm hover:underline"
//             >
//               Forgot Password?
//             </span>
//           </div>

//           {errorMsg && (
//             <p className="text-red-600 text-sm text-center">
//               {errorMsg}
//             </p>
//           )}

//           <button
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg"
//           >
//             {loading
//               ? "Logging in..."
//               : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm mt-5">
//           Don’t have an account?{" "}
//           <span
//             onClick={() =>
//               navigate("/register")
//             }
//             className="text-blue-600 cursor-pointer font-semibold"
//           >
//             Register
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  EnvelopeIcon, 
  LockClosedIcon,
  UserPlusIcon 
} from '@heroicons/react/24/outline';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:8080/api/User/login", { email, password });
      localStorage.setItem("token", res.data.token || res.data.accessToken || res.data.userToken);
      localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Hero Card */}
        <div className="glass-card p-10 md:p-12 text-center mb-10 shadow-2xl shadow-black/20">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/50">
            <LockClosedIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Sign in to your account to continue your job search
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-10 md:p-12 shadow-2xl shadow-black/20">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="
                    w-full pl-12 pr-5 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 
                    shadow-lg focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500/60 
                    transition-all duration-300 text-lg placeholder-gray-500
                  "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Password</label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full pl-12 pr-5 py-5 rounded-2xl backdrop-blur-sm bg-white/80 border border-white/50 
                    shadow-lg focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 
                    transition-all duration-300 text-lg placeholder-gray-500
                  "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="
                  text-indigo-600 hover:text-indigo-700 font-semibold text-lg
                  backdrop-blur-sm bg-white/60 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl
                  hover:bg-white/80 transition-all duration-300 border border-indigo-200/50
                "
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="
                p-5 rounded-2xl backdrop-blur-sm shadow-xl border text-center text-lg font-semibold
                bg-rose-100/80 border-rose-200/50 text-rose-800 shadow-rose-500/20
                transition-all duration-300
              ">
                {errorMsg}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
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
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="w-6 h-6" />
                    <span>Sign In</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center pt-8 border-t border-white/40">
            <p className="text-lg text-gray-700 mb-4">
              Don't have an account?
            </p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                w-full px-8 py-4 rounded-2xl font-bold text-xl
                backdrop-blur-xl bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white
                shadow-2xl shadow-emerald-500/40 hover:shadow-3xl hover:shadow-emerald-500/60
                hover:scale-105 transition-all duration-300 border border-emerald-200/50
              "
              disabled={loading}
            >
              <UserPlusIcon className="w-7 h-7 inline mr-3" />
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;