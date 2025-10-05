import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useFriendStore = create((set, get) => ({
  searchTerm: "",
  searchResults: [],
  friendList: [],
  friendRequests: [],
  isSearching: false,

  setSearchTerm: (term) => set({ searchTerm: term }),

  searchFriend: async () => {
    const { searchTerm } = get();

    if (!searchTerm.trim()) return;

    try {
      set({ isSearching: true });
      const response = await axios.post(
        `/api/friends/search`,
        { identifier: searchTerm },
        { withCredentials: true }
      );

      set({ searchResults: response.data, isSearching: false });
    } catch (error) {
      set({ searchResults: [], isSearching: false });
    }
  },

  clearSearch: () =>
    set({
      searchTerm: "",
      searchResults: [],
      isSearching: false,
    }),

  addFriend: async (friendId) => {
    if (!friendId) return;

    try {
      const response = await axios.post(
        `/api/friends/sendRequest`,
        { identifier: friendId },
        { withCredentials: true }
      );

      toast.success(response.data.message);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong while adding friend.";
      toast.error(message);
    }
  },

  getFriends: async () => {
    try {
      const response = await axios.get(`/api/friends/getFriends`, {
        withCredentials: true,
      });
      set({ friendList: response.data });
    } catch (error) {
      console.error("Failed to fetch friends:", error.message);
      set({ friendList: [] });
    }
  },

  getRequests: async () => {
    try {
      const response = await axios.get(`/api/friends/getRequests`, {
        withCredentials: true,
      });
      set({ friendRequests: response.data });
    } catch (error) {
      console.error("Failed to fetch friend requests:", error.message);
      set({ friendRequests: [] });
    }
  },

  acceptRequest: async (requesterId) => {
    if (!requesterId) return;

    try {
      const response = await axios.post(
        `/api/friends/acceptRequest`,
        { requesterId },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Friend request accepted.");
      await get().getRequests();
      await get().getFriends();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to accept friend request.";
      toast.error(message);
    }
  },
}));
