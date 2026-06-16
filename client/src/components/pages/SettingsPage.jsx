import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineAccountCircle,
} from "react-icons/md";

import {
  IoLogInOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import {
  FiEdit3,
  FiPlusSquare,
} from "react-icons/fi";

import { RiRobot3Line } from "react-icons/ri";
import { PiPassword } from "react-icons/pi";
import { GrHistory } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router";
import { changeTheme, setChatBot, setSettingsPageRequest } from "../../reduxstore/slices";

import cookies from "js-cookie";
import axios from "axios";

import defaultprofile from "/src/assets/defaultprofile.png";
import Message from "../../utility/Message";

const menuItems = [
  {
    name: "Profile",
    icon: <MdOutlineAccountCircle />,
  },
  {
    name: "Create a New Blog",
    icon: <FiPlusSquare />,
  },
  {
    name: "Chat Bot",
    icon: <RiRobot3Line />,
  },
  {
    name: "Change Password",
    icon: <PiPassword />,
  },
  {
    name: "Theme",
    icon: <GrHistory />,
  },
];

function Settingspage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBlogType, setShowBlogType] = useState(false);
  const [showTheme, setshowtheme] = useState(false);

  const theme = useSelector(
    (state) => state.theme.currentTheme
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user");

      setUser(userData ? JSON.parse(userData) : null);

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/logout`,
        {},
        { withCredentials: true }
      );

      cookies.remove("token");
      localStorage.removeItem("user");

      dispatch(setSettingsPageRequest());

      Message("Logged Out Successfully!", "OK");

      window.location.reload();
    } catch (error) {
      Message("Can't logout right now!", "warning");
    }
  };

  const handleClicks = (item, index) => {
    if (index === 0) {
      dispatch(setSettingsPageRequest());
      navigate(`/user/${user._id}`);
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
    <div className="h-full text-[var(--text)] px-4 py-1 relative overflow-y-scroll overflow-x-hidden">

      <div className="absolute bottom-[-10px] right-[-120px] w-[300px] h-[300px] bg-blue-600/20 blur-3xl rounded-full" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 relative">
            <button
              onClick={() => {
                dispatch(setSettingsPageRequest(false));
                navigate("/editprofile");
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
            >
              <FiEdit3 className="text-white text-lg" />
            </button>
          </div>

          {/* Profile */}
          <div className="px-6 pb-6 relative">
            <div className="-mt-14 flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-28 h-28 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <img
                    src={user?.profile || defaultprofile}
                    alt="profile"
                    className="w-28 h-28 rounded-full border-4 border-[#0f172a] object-cover shadow-xl"
                  />

                  <h2 className="mt-4 text-2xl font-bold capitalize">
                    {user?.userName || "Guest"}
                  </h2>

                  <p className="text-[var(--text)] opacity-60 text-sm">
                    Manage your account settings
                  </p>
                </>
              )}
            </div>

            {/* Menu */}
            <div className="mt-8 flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleClicks(item, index)}
                    className="
                      w-full flex items-center justify-between
                      px-5 py-2 rounded-2xl
                      bg-white/5 border border-white/10
                      hover:bg-white/10
                      transition-all duration-300
                      active:scale-[0.98]
                    "
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-cyan-400">
                        {item.icon}
                      </span>

                      <span className="text-sm xl:text-md">{item.name}</span>
                    </div>

                    {(index === 1 || index === 4) && (
                      <FaAngleDown
                        className={`
                          transition-all duration-300
                          ${
                            (index === 1 && showBlogType) ||
                            (index === 4 && showTheme)
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    )}
                  </button>

                  {/* Blog Dropdown */}
                  <AnimatePresence>
                    {index === 1 && showBlogType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-6 mt-3"
                      >
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => handleBlogPost("blogvideo")}
                            className="bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl text-left transition"
                          >
                            🎥 Video Blog
                          </button>

                          <button
                            onClick={() => handleBlogPost("blogimg")}
                            className="bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl text-left transition"
                          >
                            🖼️ Image Blog
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Theme Dropdown */}
                  <AnimatePresence>
                    {index === 4 && showTheme && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-6 mt-3"
                      >
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => dispatch(changeTheme("bright"))}
                            className={`
                              px-4 py-3 rounded-xl text-left transition
                              ${
                                theme === "bright"
                                  ? "bg-cyan-500 text-white"
                                  : "bg-white/5 hover:bg-white/10"
                              }
                            `}
                          >
                            ☀️ Bright Mode
                          </button>

                          <button
                            onClick={() => dispatch(changeTheme("dark"))}
                            className={`
                              px-4 py-3 rounded-xl text-left transition
                              ${
                                theme === "dark"
                                  ? "bg-cyan-500 text-white"
                                  : "bg-white/5 hover:bg-white/10"
                              }
                            `}
                          >
                            🌙 Dark Mode
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Logout/Login */}
              <button
                onClick={() =>
                  user
                    ? handleLogout()
                    : (navigate("/login"), dispatch(setSettingsPageRequest()))
                }
                className="
                  mb-12 mt-2 w-full flex items-center gap-4
                  px-5 py-3 rounded-2xl
                  bg-red-500/10 border border-red-500/20
                  hover:bg-red-500/20
                  transition-all duration-300
                  active:scale-[0.98]
                "
              >
                <span className="text-2xl text-red-400">
                  {user ? <IoLogOutOutline /> : <IoLogInOutline />}
                </span>

                <span className="font-semibold xl:text-lg">
                  {user ? "Logout" : "Login"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settingspage;
