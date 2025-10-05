import React from "react";
import { useChatStore } from "../store/useChatStore";
import CloseIcon from "@mui/icons-material/Close";

const ChatHeader = () => {
  const { friend } = useChatStore();

  const handleCloseChat = () => {
    useChatStore.setState({
      isChatOpen: false,
      chatId: null,
      messages: [],
      friend: {},
    });
  };

  if (!friend || !friend.username) return null;

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-base-100 border-b border-base-300 shadow-sm z-10">
      <button
        onClick={handleCloseChat}
        className="btn btn-sm btn-circle btn-ghost text-base-content hover:bg-red-100 hover:text-red-500 transition"
      >
        <CloseIcon fontSize="small" />
      </button>

      <div className="flex items-center gap-3 mx-auto">
        <img
          src={friend.profile || "/default.png"}
          alt="Friend"
          className="w-9 h-9 rounded-full border object-cover"
        />
        <div className="text-center">
          <div className="text-base font-semibold text-base-content">
            {friend.username}
          </div>
        </div>
      </div>

      <div className="w-9 h-9" />
    </div>
  );
};

export default ChatHeader;
