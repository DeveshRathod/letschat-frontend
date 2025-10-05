import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import socket from "../utils/socket";
import { useChatStore } from "./useChatStore";

const useUserStore = create(
  persist(
    (set) => ({
      isSignedIn: false,
      user: null,
      isLoading: false,
      isUpdating: false,

      Signup: async (data) => {
        set({ isLoading: true });

        try {
          const res = await axios.post(`/api/auth/signup`, data, {
            withCredentials: true,
          });

          set({
            user: res.data.user,
            isSignedIn: true,
          });

          toast.success(res.data.message || "Signup successful");
        } catch (err) {
          toast.error("User registration failed");
        } finally {
          set({ isLoading: false });
        }
      },

      Signin: async (data) => {
        set({ isLoading: true });

        try {
          const res = await axios.post(`/api/auth/signin`, data, {
            withCredentials: true,
          });

          set({
            user: res.data.user,
            isSignedIn: true,
          });

          toast.success(res.data.message || "Signin successful");
        } catch (err) {
          toast.error("Invalid credentials");
        } finally {
          set({ isLoading: false });
        }
      },

      Signout: async () => {
        set({ isLoading: true });

        try {
          await axios.post(`/api/auth/signout`, {}, { withCredentials: true });

          set({
            user: null,
            isSignedIn: false,
          });

          socket.disconnect();
          useChatStore.setState({
            chatId: null,
            messages: [],
            isChatOpen: false,
          });

          toast.success("Signed out successfully");
        } catch (err) {
          toast.error("Error signing out");
        } finally {
          set({ isLoading: false });
        }
      },

      Check: async () => {
        set({ isLoading: true });

        try {
          const res = await axios.post(
            `/api/auth/check`,
            {},
            { withCredentials: true }
          );

          set({
            user: res.data.user,
            isSignedIn: true,
          });
        } catch (err) {
          set({
            user: null,
            isSignedIn: false,
          });

          useChatStore.setState({
            chatId: null,
            messages: [],
            isChatOpen: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: async (data) => {
        set({ isUpdating: true });
        try {
          const res = await axios.post(`/api/auth/updateUser`, data, {
            withCredentials: true,
          });
          set({ user: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(
            error.response?.data?.message || "Failed to update profile"
          );
        } finally {
          set({ isUpdating: false });
        }
      },
    }),
    {
      name: "user",
      partialize: (state) => ({
        user: state.user,
        isSignedIn: state.isSignedIn,
      }),
    }
  )
);

export default useUserStore;
