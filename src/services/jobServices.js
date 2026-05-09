import axios from "../utils/axios";

// Existing functions...

export const getRecruiterApplications = async () => {
  const res = await axios.get("/api/Jobs/recruiter/applications");
  return res.data;
};

export const updateApplicationStatus = async (id, status) => {
  const res = await axios.put("/api/Jobs/application/status", {
    applicationId: id,
    status,
  });

  return res.data;
};