
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Jobs from "./pages/jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJob from "./pages/createJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyJobs from "./pages/myJobs";
import EditJob from "./pages/editJob";
import JobApplications from "./pages/jobApplications";
import RecruiterApplications from "./pages/recruiterApplication";
import Profile from "./pages/profile";
import MyApplications from "./pages/myApplications";
import { Toaster } from "react-hot-toast";
/* Forgot Password Flow */
import ForgotPassword from "./pages/forgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/resetPassword";
import Chat from "./pages/chat";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Toast UI */}
      <Toaster position="top-right" />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= COMMON DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= JOBS ================= */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        {/* ================= CANDIDATE ================= */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= RECRUITER ================= */}
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-applications"
          element={
            <ProtectedRoute>
              <JobApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter-applications"
          element={
            <ProtectedRoute>
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />
<Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;