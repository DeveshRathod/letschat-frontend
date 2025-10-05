import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChat from "./NoChat";
import MessageInput from "./MessageInput";
import useUserStore from "../store/useUserStore";
import socket from "../utils/socket";
import ChatSkeleton from "../skeletons/ChatSkeleton";
import ChatBackground from "./ChatBackGround";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  const { chatId, messages, isChatLoading, isChatOpen } = useChatStore();
  const user = useUserStore((state) => state.user);
  const bottomRef = useRef(null);
  const isMyMessage = (msg) => {
    return msg?.sender?._id?.toString() === user?.id?.toString();
  };

  useEffect(() => {
    const messageHandler = (newMessage) => {
      const { chatId: currentChatId, messages: currentMessages } =
        useChatStore.getState();
      const user = useUserStore.getState().user;

      const isFromOrToChatPartner =
        (newMessage.sender._id === user.id &&
          newMessage.receiver._id === currentChatId) ||
        (newMessage.sender._id === currentChatId &&
          newMessage.receiver._id === user.id);

      if (isFromOrToChatPartner) {
        useChatStore.setState({
          messages: [...currentMessages, newMessage],
        });
      }
    };

    socket.on("message", messageHandler);
    return () => socket.off("message", messageHandler);
  }, []);

  useEffect(() => {
    if (isChatOpen && !isChatLoading && messages.length > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
      }, 50);
    }
  }, [isChatOpen, isChatLoading]);

  if (!chatId) return <NoChat />;

  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="relative flex flex-col h-full">
      {!isChatLoading && <ChatHeader />}

      <ChatBackground />
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="flex flex-col h-full relative">
          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-4">
            {isChatLoading ? (
              <>
                <ChatSkeleton />
              </>
            ) : safeMessages.length === 0 ? (
              <p className="text-center text-sm text-base-content/50">
                No messages yet.
              </p>
            ) : (
              safeMessages.map((msg) => {
                const time = msg?.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";

                const isMine = isMyMessage(msg);
                const profileImg = isMine
                  ? msg?.sender?.profile
                  : msg?.receiver?.profile;

                return (
                  <div
                    key={msg._id}
                    className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                  >
                    <div
                      className={`chat-bubble ${
                        isMine
                          ? "bg-emerald-600 text-white"
                          : "bg-base-200 text-base-content"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>

                    <div className="chat-footer opacity-50 text-xs">{time}</div>
                  </div>
                );
              })
            )}

            <div ref={bottomRef} />
          </div>

          <MessageInput receiverId={chatId} bottomRef={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
