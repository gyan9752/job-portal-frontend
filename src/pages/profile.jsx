// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import API from "../services/api";

// const Profile = () => {
//   const [file, setFile] = useState(null);

//   const uploadResume = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       const res = await API.post(
//         "/upload/resume",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Resume Uploaded Successfully ✅");
//       console.log(res.data);

//     } catch (error) {
//       console.log(error);
//       alert("Upload Failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//         <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
//           <h1 className="text-3xl font-bold text-center mb-6">
//             Upload Resume
//           </h1>

//           <form onSubmit={uploadResume} className="space-y-4">
//             <input
//               type="file"
//               onChange={(e) =>
//                 setFile(e.target.files[0])
//               }
//               className="w-full border p-3 rounded"
//             />

//             <button className="w-full bg-blue-600 text-white py-3 rounded">
//               Upload Resume
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";

import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const emptyUser = {
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    bio: "",
    avatar: "",
    role: "",
  };

  const [user, setUser] = useState(emptyUser);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!ignore) {
          setUser(data.user || emptyUser);
          setAvatarPreview(data.user?.avatar || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      setUser(data.user || emptyUser);
      setAvatarPreview(data.user?.avatar || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // FIXED: now used in inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarPreview(reader.result);

        setUser((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(user),
      });

      if (response.ok) {
        setIsEditing(false);
        await fetchProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-white">
            <div className="flex items-center space-x-6">

              <div className="relative">
                <div className="h-28 w-28 rounded-full overflow-hidden bg-indigo-100 border-4 border-white shadow-lg">

                  <img
                    src={
                      avatarPreview ||
                      user.avatar ||
                      "/default-avatar.png"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">

                    <CameraIcon className="h-5 w-5 text-indigo-600" />

                    <input
                      type="file"
                      onChange={handleAvatarChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold mb-1">
                  {user.name || "Your Name"}
                </h1>

                <p className="text-indigo-100">
                  {user.role || "Job Seeker"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <PencilIcon className="h-5 w-5" />
                <span>{isEditing ? "Editing" : "Edit"}</span>
              </button>

            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone
              </label>

              <div className="relative">
                <PhoneIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>

              <div className="relative">
                <MapPinIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company
              </label>

              <div className="relative">
                <BuildingOfficeIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="text"
                  name="company"
                  value={user.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Bio
              </label>

              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="4"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">

                <button
                  type="button"
                  onClick={async () => {
                    setIsEditing(false);
                    await fetchProfile();
                  }}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors font-medium"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;