// import { useEffect, useState, useRef } from "react";
// import API from "../services/api";
// import socket from "../socket";

// const NotificationBell = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [notifications, setNotifications] = useState([]);
//   const [count, setCount] = useState(0);
//   const [show, setShow] = useState(false);

//   const boxRef = useRef();

//   /* =======================
//      JOIN SOCKET + LIVE DATA
//   ======================= */
//   useEffect(() => {
//     if (user?.id) {
//       socket.emit("join", user.id);
//     }

//     socket.on("new_notification", (data) => {
//       setNotifications((prev) => [
//         {
//           title: data.title,
//           message: data.message,
//           createdAt: new Date(),
//         },
//         ...prev,
//       ]);

//       setCount((prev) => prev + 1);
//     });

//     return () => {
//       socket.off("new_notification");
//     };
//   }, [user?.id]);

//   /* =======================
//      FETCH OLD NOTIFICATIONS
//   ======================= */
//   const fetchNotifications = async () => {
//     try {
//       const res = await API.get("/notification");

//       setNotifications(res.data.notifications || []);

//       const unread =
//         res.data.notifications?.filter(
//           (item) => item.isRead === false
//         ).length || 0;

//       setCount(unread);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   /* =======================
//      MARK ALL READ
//   ======================= */
//   const markAllRead = async () => {
//     try {
//       await API.put("/notification/read");
//       setCount(0);

//       setNotifications((prev) =>
//         prev.map((item) => ({
//           ...item,
//           isRead: true,
//         }))
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   /* =======================
//      OPEN DROPDOWN
//   ======================= */
//   const handleOpen = () => {
//     setShow(!show);

//     if (!show) {
//       fetchNotifications();
//       markAllRead();
//     }
//   };

//   /* =======================
//      OUTSIDE CLICK CLOSE
//   ======================= */
//   useEffect(() => {
//     const close = (e) => {
//       if (
//         boxRef.current &&
//         !boxRef.current.contains(e.target)
//       ) {
//         setShow(false);
//       }
//     };

//     document.addEventListener("mousedown", close);

//     return () =>
//       document.removeEventListener("mousedown", close);
//   }, []);

//   return (
//     <div className="relative" ref={boxRef}>
//       {/* Bell */}
//       <button
//         onClick={handleOpen}
//         className="text-2xl relative"
//       >
//         🔔

//         {count > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
//             {count}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {show && (
//         <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
//           <div className="flex justify-between items-center mb-3">
//             <h2 className="text-lg font-bold">
//               Notifications
//             </h2>

//             <button
//               onClick={markAllRead}
//               className="text-sm text-blue-600"
//             >
//               Mark Read
//             </button>
//           </div>

//           {notifications.length > 0 ? (
//             notifications.map((item, index) => (
//               <div
//                 key={index}
//                 className="border-b py-3"
//               >
//                 <p className="font-semibold">
//                   {item.title}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   {item.message}
//                 </p>

//                 <p className="text-xs text-gray-400 mt-1">
//                   {item.createdAt
//                     ? new Date(
//                         item.createdAt
//                       ).toLocaleString()
//                     : ""}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">
//               No notifications
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;


import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import socket from "../socket";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";

const NotificationBell = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const boxRef = useRef();

  /* ======================= SOCKET + LIVE DATA ======================= */
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
          isRead: false,
        },
        ...prev,
      ]);
      setCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [user?.id]);

  /* ======================= FETCH NOTIFICATIONS ======================= */
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notification");
      setNotifications(res.data.notifications || []);
      const unread = res.data.notifications?.filter((item) => !item.isRead).length || 0;
      setCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================= MARK ALL READ ======================= */
  const markAllRead = async () => {
    try {
      await API.put("/notification/read");
      setCount(0);
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================= TOGGLE DROPDOWN ======================= */
  const handleOpen = () => {
    setShow(!show);
    if (!show) {
      fetchNotifications();
      markAllRead();
    }
  };

  /* ======================= OUTSIDE CLICK ======================= */
  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        className="
          relative p-3 rounded-2xl backdrop-blur-sm bg-white/20 hover:bg-white/40
          shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-purple-500/25
          border border-white/30 hover:border-purple-200/50 transition-all duration-300
          hover:scale-110 group
        "
      >
        <IoNotificationsOutline className="w-7 h-7 text-white/90 group-hover:text-white" />
        
        {count > 0 && (
          <div className="
            absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-rose-600
            rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/40
            text-white text-xs font-bold border-2 border-white/30 animate-pulse
          ">
            {count > 99 ? '99+' : count}
          </div>
        )}
      </button>

      {/* Glassmorphism Dropdown */}
      {show && (
        <div className={`
          absolute right-0 top-14 w-96 backdrop-blur-3xl bg-white/80 shadow-2xl shadow-black/20
          border border-white/40 rounded-3xl p-6 z-50 max-h-96 overflow-y-auto
          hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-300
        `}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/40">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
              Notifications
            </h2>
            <button
              onClick={markAllRead}
              className="
                px-4 py-2 rounded-xl font-semibold text-sm
                backdrop-blur-sm bg-gradient-to-r from-purple-500/80 to-indigo-600/80
                text-white hover:from-purple-600 hover:to-indigo-700 shadow-xl shadow-purple-500/30
                hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300
              "
            >
              Mark All Read
            </button>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-2xl mb-4 last:mb-0 backdrop-blur-sm bg-white/60 hover:bg-white/80
                  shadow-lg hover:shadow-xl hover:shadow-purple-500/20 border border-white/30
                  transition-all duration-300 hover:-translate-y-1 ${!item.isRead ? 'ring-2 ring-purple-400/50' : ''}
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-tight">
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Just now"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <IoNotificationsOutline className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No notifications</p>
              <p className="text-gray-400 text-sm mt-1">Everything is up to date</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;