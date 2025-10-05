import React, { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { useChatStore } from "../store/useChatStore";
import NoFriends from "./NoFriends";

const Friends = () => {
  const { friendList, getFriends } = useFriendStore();
  const { setChat, chatId } = useChatStore();

  useEffect(() => {
    getFriends();
  }, []);

  if (friendList && friendList.length === 0) {
    return <NoFriends />;
  }

  return (
    <ul className="space-y-1">
      {friendList &&
        friendList.map((friend) => {
          const isActive = chatId === friend._id;

          return (
            <li
              key={friend._id}
              onClick={() => setChat(friend._id)}
              className={`w-full rounded cursor-pointer transition-all
                ${isActive ? "bg-base-300" : "hover:bg-base-300"}`}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 px-4 py-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={friend.profile} alt={friend.username} />
                  </div>
                </div>

                <span className="text-sm font-medium hidden lg:inline">
                  {friend.username}
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Friends;
