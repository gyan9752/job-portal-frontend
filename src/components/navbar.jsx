import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationBell from "./notificationbell";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  /* scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-white/20 text-white"
      : "text-white/80 hover:text-white hover:bg-white/10";

  const getNavLinks = () => {
    if (user?.role === "candidate") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Jobs", path: "/jobs" },
        { name: "Applications", path: "/my-applications" },
        { name: "Profile", path: "/profile" },
      ];
    }
    if (user?.role === "recruiter") {
      return [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Create Job", path: "/create-job" },
        { name: "My Jobs", path: "/my-jobs" },
        { name: "Applications", path: "/job-applications" },
      ];
    }
    return [];
  };

  return (
    <nav
      className={`
      fixed top-0 left-0 w-full z-50
      transition-all duration-300
      ${scrolled ? "bg-black/40 backdrop-blur-xl" : "bg-black/20 backdrop-blur-md"}
    `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            J
          </div>
          <span className="text-white font-bold text-xl">
            Job Portal
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-2">
          {getNavLinks().map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${isActive(
                link.path
              )}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* ICON FIX 🔥 */}
          {user && (
            <div className="w-9 h-9 flex items-center justify-center text-white">
              <NotificationBell />
            </div>
          )}

          {/* fallback icon */}
          <IoNotificationsOutline className="text-white w-6 h-6" />

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;