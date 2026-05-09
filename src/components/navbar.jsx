import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../socket";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (user?.id) {
      socket.emit("join", user.id);
    }

    socket.on("new_notification", (data) => {
      setCount((prev) => prev + 1);

      setNotifications((prev) => [
        {
          title: data.title,
          message: data.message,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [user?.id]);

  /* ================= FETCH NOTIFICATIONS ================= */
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notification");
      setNotifications(res.data.notifications || []);
      setCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ================= ACTIVE MENU ================= */
  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 font-bold"
      : "text-gray-700 hover:text-blue-500";
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center relative">
      
      {/* Logo */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Job Portal
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Candidate */}
        {user?.role === "candidate" && (
          <>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/jobs" className={isActive("/jobs")}>
              Jobs
            </Link>

            <Link
              to="/my-applications"
              className={isActive("/my-applications")}
            >
              My Applications
            </Link>

            <Link to="/profile" className={isActive("/profile")}>
              Profile
            </Link>
          </>
        )}

        {/* Recruiter */}
        {user?.role === "recruiter" && (
          <>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/create-job" className={isActive("/create-job")}>
              Create Job
            </Link>

            <Link to="/my-jobs" className={isActive("/my-jobs")}>
              My Jobs
            </Link>

            <Link
              to="/job-applications"
              className={isActive("/job-applications")}
            >
              Applications
            </Link>
          </>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>

            <Link to="/users" className={isActive("/users")}>
              Users
            </Link>

            <Link to="/jobs" className={isActive("/jobs")}>
              Jobs
            </Link>
          </>
        )}

        {/* Notification Bell */}
        <div className="relative flex items-center">
          <button
            onClick={() => {
              setShow(!show);
              fetchNotifications();
            }}
            className="relative text-gray-700 hover:text-blue-600"
          >
            <IoNotifications size={28} />

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                {count}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {show && (
            <div className="absolute right-0 top-12 w-80 bg-white shadow-xl border rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
              <h2 className="text-lg font-bold mb-3">
                Notifications
              </h2>

              {notifications.length > 0 ? (
                notifications.map((item, index) => (
                  <div
                    key={index}
                    className="border-b py-3 last:border-none"
                  >
                    <p className="font-semibold text-sm">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No notifications
                </p>
              )}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;