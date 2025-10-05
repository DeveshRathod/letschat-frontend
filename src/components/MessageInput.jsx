import React, { useState, useRef, useEffect } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useChatStore } from "../store/useChatStore";

const MessageInput = ({ receiverId }) => {
  const [text, setText] = useState("");
  const sendMessage = useChatStore((state) => state.sendMessage);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      await sendMessage(receiverId, trimmed);
      setText("");

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div ref={bottomRef} style={{ visibility: "hidden", height: 0 }} />

      <div className="absolute bottom-0 left-0 right-0 bg-base-100 border-t border-emerald-600 z-10">
        <div className="px-4 py-3">
          <div
            className="flex items-center gap-2 rounded-full bg-base-200 px-4 py-2
          focus-within:ring-2 focus-within:ring-emerald-600"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-base-content/50"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="text-white text-sm px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-800 transition"
              onClick={handleSend}
              disabled={!text.trim()}
            >
              <TelegramIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageInput;
