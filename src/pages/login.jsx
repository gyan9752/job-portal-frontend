// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// function Login() {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleLogin = async (e) => {
//     e.preventDefault()
// try {
// //   const res = await axios.post(
// //     "http://localhost:8080/api/User/login",
// //     {
// //       email,
// //       password
// //     }
// //   )

// // console.log("FULL RESPONSE:", res.data)
// // console.log("USER:", res.data.user)

// //   localStorage.setItem("token", res.data.token)
// //   localStorage.setItem("user", JSON.stringify(res.data.user || res.data))

// //   window.location.href = "/dashboard"

// const res = await axios.post(
//   "http://localhost:8080/api/User/login",
//   { email, password }
// )

// console.log(res.data)

// localStorage.setItem(
//   "token",
//   res.data.token || res.data.accessToken || res.data.userToken
// )

// localStorage.setItem(
//   "user",
//   JSON.stringify(res.data.user || res.data)
// )

// window.location.href = "/dashboard"

// } catch (error) {
//   console.log(error)
// }
//   }

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-96">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
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

//           <div className="text-right mt-2">
//   <span
//     onClick={() => navigate("/forgot-password")}
//     className="text-blue-600 cursor-pointer text-sm"
//   >
//     Forgot Password?
//   </span>
// </div>

//           <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.post(
        "http://localhost:8080/api/User/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token ||
          res.data.accessToken ||
          res.data.userToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user || res.data
        )
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);

      setErrorMsg(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <div className="text-right">
            <span
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-blue-600 cursor-pointer text-sm hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">
              {errorMsg}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;