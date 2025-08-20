// client/src/components/ChatWindow.js
import React, { useState, useEffect } from "react";
import socket from "../socket";

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>💬 Real-Time Chat</h2>
      <div
        style={{
          height: 300,
          border: "1px solid #ccc",
          padding: 10,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>🗨 {msg}</div>
        ))}
      </div>
      <input
        style={{ width: "70%", padding: "8px" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        style={{ marginLeft: 10, padding: "8px 16px" }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
