import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../socket";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* SOCKET JOIN */
  useEffect(() => {
    if (user?._id) socket.emit("join", user._id);
  }, [user?._id]);

  /* LOAD CHATS */
  useEffect(() => {
    const load = async () => {
      const res = await API.get("/chat/user/chats");
      setChats(res.data?.data || []);
    };
    load();
  }, []);

  /* OPEN CHAT */
  const openChat = async (chat) => {
    setSelectedChat(chat);

    const res = await API.get(`/chat/${chat._id}/messages`);
    setMessages(res.data?.data || []);
  };

  /* SEND MESSAGE */
  const sendMessage = async () => {
    if (!text || !selectedChat) return;

    const res = await API.post("/chat/send", {
      chatId: selectedChat._id,
      text,
    });

    setMessages((prev) => [...prev, res.data.data]);
    setText("");
  };

  /* RECEIVE MESSAGE */
  useEffect(() => {
    const handler = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handler);

    return () => socket.off("newMessage", handler);
  }, []);

  return (
    <div className="flex h-screen">

      {/* LEFT */}
      <div className="w-1/3 border-r p-4">
        <h2 className="font-bold mb-4">Chats</h2>

        {(chats || []).map((chat) => {
          const otherUser = chat.members.find(
            (m) => m._id !== user._id
          );

          return (
            <div
              key={chat._id}
              onClick={() => openChat(chat)}
              className="p-2 border mb-2 cursor-pointer"
            >
              {otherUser?.name || "User"}
            </div>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col p-4">

        <div className="flex-1 overflow-y-auto">
          {(messages || []).map((m) => (
            <div key={m._id}>
              <b>{m.sender === user._id ? "You" : "User"}:</b>{" "}
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="border flex-1 p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;