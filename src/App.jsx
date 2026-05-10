import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Jobs from "./pages/jobs";
import Profile from "./pages/profile";
import MyApplications from "./pages/myApplications";

import CreateJob from "./pages/createJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyJobs from "./pages/myJobs";
import EditJob from "./pages/editJob";
import JobApplications from "./pages/jobApplications";
import RecruiterApplications from "./pages/recruiterApplication";
import Chat from "./pages/chat";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-20 bg-gray-50">
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />

            <Route path="/create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
            <Route path="/recruiter-dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
            <Route path="/edit-job/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
            <Route path="/job-applications" element={<ProtectedRoute><JobApplications /></ProtectedRoute>} />
            <Route path="/recruiter-applications" element={<ProtectedRoute><RecruiterApplications /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;