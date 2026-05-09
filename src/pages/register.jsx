import { useState } from "react"
import axios from "axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("candidate")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://localhost:8080/api/User/register",
        {
        name, email, password, role
        }
      )

      alert("Registration Success")
      window.location.href = "/login"

    } catch (error) {
      console.log(error)
      alert("Registration Failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
            <select
            value={role}
              className="w-full border p-3 rounded-lg"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="candidate">Candidate</option>
              <option value="admin">Admin</option>
                <option value="recruiter">Recruiter</option>
            </select>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Register
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register