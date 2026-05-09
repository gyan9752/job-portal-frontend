import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import socket from "../socket";

const NotificationBell = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  const boxRef = useRef();

  /* =======================
     JOIN SOCKET + LIVE DATA
  ======================= */
  useEffect(() => {
    if (user?.id) {
      socket.emit("join", user.id);
    }

    socket.on("new_notification", (data) => {
      setNotifications((prev) => [
        {
          title: data.title,
          message: data.message,
          createdAt: new Date(),
        },
        ...prev,
      ]);

      setCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [user?.id]);

  /* =======================
     FETCH OLD NOTIFICATIONS
  ======================= */
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notification");

      setNotifications(res.data.notifications || []);

      const unread =
        res.data.notifications?.filter(
          (item) => item.isRead === false
        ).length || 0;

      setCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  /* =======================
     MARK ALL READ
  ======================= */
  const markAllRead = async () => {
    try {
      await API.put("/notification/read");
      setCount(0);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* =======================
     OPEN DROPDOWN
  ======================= */
  const handleOpen = () => {
    setShow(!show);

    if (!show) {
      fetchNotifications();
      markAllRead();
    }
  };

  /* =======================
     OUTSIDE CLICK CLOSE
  ======================= */
  useEffect(() => {
    const close = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      {/* Bell */}
      <button
        onClick={handleOpen}
        className="text-2xl relative"
      >
        🔔

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
            {count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {show && (
        <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">
              Notifications
            </h2>

            <button
              onClick={markAllRead}
              className="text-sm text-blue-600"
            >
              Mark Read
            </button>
          </div>

          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div
                key={index}
                className="border-b py-3"
              >
                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="text-sm text-gray-600">
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleString()
                    : ""}
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
  );
};

export default NotificationBell;