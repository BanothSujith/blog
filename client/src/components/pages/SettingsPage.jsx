import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { FiEdit3, FiPlusSquare } from "react-icons/fi";
import { RiRobot3Line } from "react-icons/ri";
import { PiPassword } from "react-icons/pi";
import { GrHistory } from "react-icons/gr";
import defaultprofile from "/src/assets/defaultprofile.png";
import { useNavigate } from "react-router";
import { FaAngleDown } from "react-icons/fa";
import {
  changeTheme,
  setChatBot,
  setSettingsPageRequest,
} from "../../reduxstore/slices";
import Message from "../../utility/Message";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const menuItems = [
  { name: "Profile", icon: <MdOutlineAccountCircle /> },
  { name: "Create a New Blog", icon: <FiPlusSquare /> },
  { name: "Chat Bot", icon: <RiRobot3Line /> },
  { name: "Change Password", icon: <PiPassword /> },
  { name: "Theme", icon: <GrHistory /> },
];

function Settingspage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.theme.currentTheme);
  const [showBlogType, setShowBlogType] = useState(false);
  const [showTheme, setshowtheme] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URI}/logout`,
      {},
      { withCredentials: true }
    );
    if (response.data?.message === "Logout successful") {
      Message("Logged Out Successfully....!", "OK");
    }
    setUser(null);
    localStorage.removeItem("user");
    dispatch(setSettingsPageRequest());

    window.location.reload();


  };

  const handleClicks = (item, index) => {
    if (index === 0) {
      dispatch(setSettingsPageRequest());
      navigate(`/user/${user._id}`);
    }
    if (item.navigateTo) {
      navigate(item.navigateTo);
    }
    if (index === 1) {
      setShowBlogType(!showBlogType);
    }
    if (index === 2) {
      dispatch(setSettingsPageRequest());
      dispatch(setChatBot());
    }
    if (index === 3) {
      navigate("/changepassword");
      dispatch(setSettingsPageRequest());
    }
    if (index === 4) {
      setshowtheme(!showTheme);
    }
  };

  const handleBlogPost = (path) => {
    navigate(`/${path}`);
    dispatch(setSettingsPageRequest());
  };

  return (
    <div className="w-full h-full text-[var(--text)] bg-[var(--bg-body)] py-4 flex flex-col gap-8 items-center transition-all duration-500 ease-linear">
      {/* Profile Section with Loading */}
      <div className="flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 border-4 border-[var(--text)] border-t-transparent rounded-full animate-spin"></div>
            <div className="w-32 h-6 bg-gray-400 dark:bg-gray-500 animate-pulse rounded mt-2"></div>
          </div>
        ) : (
          <>
            <div className="relative">
              <img
                src={user?.profile || defaultprofile}
                alt="Profile"
                className="max-w-24 min-w-24 object-cover object-top aspect-square p-[1px] bg-[var(--text)] rounded-full"
              />
              <button
                className="absolute right-0 top-0 p-1 hover:scale-105 transition-all duration-75 ease-in-out"
                onClick={() => {
                  dispatch(setSettingsPageRequest(false));
                  navigate("/editprofile");
                }}
              >
                <FiEdit3 />
              </button>
            </div>
            <h2 className="p-2 text-xl font-semibold capitalize">
              {user?.userName || "Guest"}
            </h2>
          </>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col w-full bg-[var(--bg-card)] h-full">
        {menuItems.map((item, index) => (
          <div key={index} className="border-t">
            <button
              className="w-full flex gap-6 items-center px-12 py-3 transition-all duration-75 ease-in hover:bg-[var(--bg-body)] hover:shadow-sm active:scale-95"
              onClick={() => handleClicks(item, index)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-lg capitalize font-semibold">
                {item.name}
              </span>
              {(index === 1 || index === 4) && (
                <span
                  className={`text-2xl text-[var(--text)] ${
                    (index === 1 && showBlogType) ||
                    (index === 4 && showTheme)
                      ? "rotate-180"
                      : ""
                  } transition-all duration-75 ease-in-out`}
                >
                  <FaAngleDown />
                </span>
              )}
            </button>

            {/* Dropdown for Blog Types */}
            <AnimatePresence>
              {index === 1 && showBlogType && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ transformOrigin: "top" }}
                  className="flex flex-col gap-2"
                >
                  <button
                    className="text-sm font-bold px-4 rounded hover:bg-[var(--bg-body)] transition duration-75 ease-in"
                    onClick={() => handleBlogPost("blogvideo")}
                  >
                    Video Blog
                  </button>
                  <button
                    className="px-4 text-sm font-bold rounded hover:bg-[var(--bg-body)] transition duration-75 ease-in"
                    onClick={() => handleBlogPost("blogimg")}
                  >
                    Image Blog
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dropdown for Theme */}
            <AnimatePresence>
              {index === 4 && showTheme && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ transformOrigin: "top" }}
                  className="flex flex-col gap-2"
                >
                  <button
                    className="flex items-center justify-center gap-2 text-sm font-bold px-4 rounded hover:bg-[var(--bg-body)] transition duration-75 ease-in"
                    onClick={() => dispatch(changeTheme("bright"))}
                  >
                    {theme === "bright" && (
                      <span className="h-2 w-2 bg-[var(--text)] rounded-full"></span>
                    )}
                    <span>Bright mode</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-4 text-sm font-bold rounded hover:bg-[var(--bg-body)] transition duration-75 ease-in"
                    onClick={() => dispatch(changeTheme("dark"))}
                  >
                    {theme === "dark" && (
                      <span className="h-2 w-2 bg-[var(--text)] rounded-full"></span>
                    )}
                    <span>Dark mode</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Login / Logout Button */}
        <button
          className="w-full flex gap-6 items-center px-12 py-3 transition-all duration-75 ease-in hover:bg-[var(--bg-body)] hover:shadow-sm active:scale-95 border-y"
          onClick={() =>
            user
              ? handleLogout()
              : (navigate("/login"), dispatch(setSettingsPageRequest()))
          }
        >
          <span className="text-2xl">
            {user ? <IoLogOutOutline /> : <IoLogInOutline />}
          </span>
          <span className="text-lg capitalize font-semibold">
            {user ? "Logout" : "Login"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Settingspage;
