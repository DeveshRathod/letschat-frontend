import React, { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Search = () => {
  const {
    searchTerm,
    searchResults,
    isSearching,
    setSearchTerm,
    searchFriend,
    clearSearch,
    addFriend,
  } = useFriendStore();

  useEffect(() => {
    if (searchTerm.trim()) {
      const delay = setTimeout(() => {
        searchFriend();
      }, 300);
      return () => clearTimeout(delay);
    } else {
      clearSearch();
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-xs mx-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="input input-sm w-full focus:outline-none focus:ring-0 focus:border-base-content/20"
      />

      {searchTerm && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-base-100 shadow rounded mt-1 z-40 max-h-60 overflow-y-auto">
          {searchResults.map((user) => (
            <li
              key={user._id}
              className="p-2 hover:bg-base-200 flex justify-between gap-2"
            >
              <div className=" flex items-center gap-2">
                <div className="avatar">
                  <div className="w-4 rounded-full">
                    <img src={user.profile} alt={user.username} />
                  </div>
                </div>
                <span className="text-xs font-light">{user.username}</span>
              </div>
              <div>
                <button
                  className="btn btn-xs btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    addFriend(user._id);
                  }}
                >
                  <PersonAddIcon fontSize="small" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {searchTerm && isSearching && (
        <div className="absolute top-full left-0 w-full bg-base-100 rounded mt-1 px-4 py-2 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {searchTerm && !isSearching && searchResults.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-base-100 rounded mt-1 px-4 py-2 text-sm text-gray-400">
          No users found.
        </div>
      )}
    </div>
  );
};

export default Search;
