import API from "../utils/api.js";  // ← Tera api.js

// AUTH
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// JOBS
export const getJobs = () => API.get("/jobs");
export const getMyJobs = () => API.get("/jobs/my");
export const createJob = (data) => API.post("/jobs", data);
export const getJob = (id) => API.get(`/jobs/${id}`);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

// APPLICATIONS (tera code same)
export const getRecruiterApplications = async () => {
  const res = await API.get("/api/Jobs/recruiter/applications");
  return res.data;
};

export const updateApplicationStatus = async (id, status) => {
  const res = await API.put("/api/Jobs/application/status", {
    applicationId: id,
    status,
  });
  return res.data;
};

// PROFILE
export const getProfile = () => API.get("/profile");
export const updateProfile = (data) => API.put("/profile", data);