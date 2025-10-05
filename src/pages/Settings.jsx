import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import useUserStore from "../store/useUserStore";
import { useFriendStore } from "../store/useFriendStore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const handleProfileImageChange = (file, setSelectedImg, updateUser) => {
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    setSelectedImg(base64Image);
    await updateUser({ profilePic: base64Image });
  };
};

const Settings = () => {
  const { Signout, user, updateUser, isUpdating } = useUserStore();
  const { friendRequests, getRequests, acceptRequest } = useFriendStore();
  const fileInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleSignout = async () => {
    await Signout();
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleAccept = async (requesterId) => {
    await acceptRequest(requesterId);
    await getRequests();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-8 space-y-10">
        <div className="flex justify-between items-center text-emerald-600">
          <Link
            to="/"
            className="inline-flex items-center gap-2 hover:underline font-medium"
          >
            <ArrowBackIcon fontSize="small" />
            Back to Chat
          </Link>
          <p className="text-sm text-base-content/70">
            Member since:{" "}
            <span className="font-medium">{formatDate(user?.createdAt)}</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="relative w-32 h-32 group">
            <img
              src={selectedImg || user?.profile || "/default.png"}
              alt="Profile"
              className={`w-full h-full rounded-full border-4 border-emerald-500 object-cover select-none shadow-md ${
                isUpdating ? "opacity-50 blur-sm" : ""
              }`}
            />
            {isUpdating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md text-emerald-600"></span>
              </div>
            )}
            <button
              onClick={handleIconClick}
              className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-lg group-hover:scale-105 transition-transform"
              title="Change Profile Picture"
            >
              <ChangeCircleIcon className="text-emerald-600" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleProfileImageChange(file, setSelectedImg, updateUser);
            }}
          />

          <h2 className="text-3xl font-semibold text-base-content">
            {user?.username}
          </h2>
          <p className="text-sm text-base-content/60">{user?.email}</p>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow space-y-4">
          {[
            ["Username", user?.username],
            ["Email", user?.email],
            ["Birthday", formatDate(user?.birthday)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="font-medium text-base-content/70">{label}</span>
              <span className="text-base-content">{value || "-"}</span>
            </div>
          ))}
        </div>

        {friendRequests?.length > 0 && (
          <div className="bg-base-200 rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-base-content mb-2">
              Friend Requests
            </h3>
            {friendRequests.map((req) => (
              <div
                key={req._id}
                className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.profile || "/default.png"}
                    alt={req.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-base font-medium">{req.username}</span>
                </div>
                <button
                  onClick={() => handleAccept(req._id)}
                  className="btn btn-success btn-sm shadow"
                >
                  <CheckIcon fontSize="small" className="mr-1" />
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center pt-2 mb-10">
          <button
            onClick={handleSignout}
            className="btn btn-error btn-md px-8 shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
