import React from "react";
import { MessageCircle } from "lucide-react";

const NoChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-base-content/60">
      <div className="bg-base-200 rounded-full p-4 mb-4">
        <MessageCircle className="w-10 h-10 text-base-content/50" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Conversation Selected</h2>
      <p className="text-sm max-w-xs">
        Choose a friend from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default NoChat;
