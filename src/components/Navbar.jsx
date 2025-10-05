import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { useThemeStore } from "../store/useThemeStore";
import SunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Search from "./Search";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Signout, user } = useUserStore();
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Signout();
    navigate("/signin");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar bg-base-200 px-4 relative">
      <div className="flex-1">
        <button
          className="btn btn-ghost text-xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <span className="hidden md:block font-bold text-emerald-600 text-xl select-none">
          LetsChat
        </span>
      </div>

      <Search />

      <div className="flex gap-4 items-center">
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <SunnyIcon className="text-yellow-500" />
          ) : (
            <DarkModeIcon className="text-gray-800" />
          )}
        </button>

        {user?.profile && (
          <div className="dropdown dropdown-left dropdown-bottom hidden md:block">
            <div tabIndex={0} className="btn btn-circle avatar btn-ghost">
              <div className="w-8 rounded-full">
                <img src={user.profile} alt="profile" />
              </div>
            </div>
            <ul className="dropdown-content z-[1] mt-2 p-2 shadow bg-base-100 rounded-box w-40">
              <li>
                <Link
                  to="/settings"
                  className="btn btn-sm btn-ghost w-full text-left"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-ghost w-full text-left text-error"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 bg-base-100 rounded-lg shadow p-4 space-y-2 w-48 z-50">
          {user?.profile && (
            <div className="text-center">
              <Link to="/settings" className="btn btn-sm btn-ghost w-full">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-ghost w-full text-error mt-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
