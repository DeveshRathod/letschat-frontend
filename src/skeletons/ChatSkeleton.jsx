import React from "react";

const ChatSkeleton = () => {
  const bubbles = Array.from({ length: 10 });

  return (
    <div className="flex flex-col h-full relative animate-pulse px-4 py-6 space-y-4 overflow-y-auto">
      {bubbles.map((_, i) => {
        const isMine = i % 2 === 0;
        return (
          <div key={i} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-8 h-8 rounded-full bg-base-300" />
            </div>

            <div
              className={`chat-bubble ${
                isMine ? "bg-emerald-600" : "bg-base-300"
              } w-36 h-4 rounded-lg`}
            ></div>

            <div className="chat-footer opacity-50 text-xs h-3 bg-base-200 rounded w-16 mt-1" />
          </div>
        );
      })}
    </div>
  );
};

export default ChatSkeleton;
