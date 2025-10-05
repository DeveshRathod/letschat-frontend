import React from "react";
import { UserX } from "lucide-react";

const NoFriends = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center px-4">
      <div className="bg-base-200 rounded-full p-4 shadow-md">
        <UserX className="w-10 h-10 text-emerald-500" />
      </div>
    </div>
  );
};

export default NoFriends;
