import { create } from "zustand";
import axios from "axios";

export const useChatStore = create((set, get) => ({
  isChatOpen: false,
  chatId: null,
  messages: [],
  isChatLoading: false,
  friend: {},

  setChat: async (userId) => {
    if (!userId) return;

    set({
      isChatOpen: true,
      chatId: userId,
      messages: [],
      isChatLoading: true,
      friend: {},
      isFriendLoading: true,
    });

    try {
      const res = await axios.post(
        `/api/friends/getFriend`,
        { chatId: userId },
        { withCredentials: true }
      );
      set({ friend: res.data, isFriendLoading: false });

      await get().fetchMessages(userId);
    } catch (error) {
      console.error("Error fetching friend details:", error.message);
      set({ friend: {}, isFriendLoading: false });
    }
  },

  fetchMessages: async (receiverId) => {
    if (!receiverId) return;

    set({ isChatLoading: true });

    try {
      const res = await axios.post(
        `/api/messages/getMessages`,
        { receiverId },
        { withCredentials: true }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      set({ messages: [] });
    } finally {
      set({ isChatLoading: false });
    }
  },

  sendMessage: async (receiverId, text) => {
    const { messages } = get();

    try {
      const res = await axios.post(
        `/api/messages/sendMessage`,
        { receiverId, text },
        { withCredentials: true }
      );

      const newMessage = res.data.data;

      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  },
}));
