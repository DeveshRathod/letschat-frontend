import React from "react";
import Friends from "./Friends";
import Chat from "./Chat";

const Feed = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/6 bg-base-200 overflow-y-auto border-r border-emerald-600">
        <Friends />
      </div>
      <div className="flex-1 bg-base-100 relative">
        <Chat />
      </div>
    </div>
  );
};

export default Feed;
