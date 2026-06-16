import React, { Suspense, useEffect, useRef, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiImagesSquareFill } from "react-icons/pi";
import { GrNewWindow } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BlogType from "./pages/BlogType";

function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [showBlogType, setShowBlogType] = useState(false);
const timerRef = useRef(null);
  const userid = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const items = [
    { icon: IoHomeOutline, label: "Home", path: "/" },
    { icon: PiImagesSquareFill, label: "Gallery", path: "/gallery" },
    { icon: GrNewWindow, label: "Create", path: "/create" },
    {
      icon: MdOutlineAccountCircle,
      label: "Profile",
      path: `/user/${userid?._id}`,
    },
  ];
  const handleNavigation = (path, label) => {
    if (label === "Create") {
      setShowBlogType((prev) => !prev);
    } else {
      navigate(path);
      setShowBlogType(false);
    }
  }
useEffect(() => {
  const hideNavbar = () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setShowBlogType(false);
    }, 1000);
  };

  hideNavbar();

  const handleMove = (e) => {
    if (e.clientX > 100 && e.clientX < 500) {
      setVisible(true);
      hideNavbar();
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0].clientX > 100) {
      setVisible(true);
      hideNavbar();
    }
  };

  window.addEventListener("mousemove", handleMove);
  window.addEventListener("touchmove", handleTouchMove);

  return () => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("touchmove", handleTouchMove);

    clearTimeout(timerRef.current);
  };
}, []);


  return (
    <div
      className="fixed left-2 top-0 h-full flex items-center z-50"
      onMouseEnter={() => {
        setVisible(true);
        clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        timerRef.current = setTimeout(() => {
          setVisible(false);
          setShowBlogType(false);
        }, 1000);
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="
              flex flex-col gap-5
              bg-[var(--navbar)]
              px-3 py-4
              rounded-2xl
              shadow-xl
              backdrop-blur-xl
              border border-white/10
            "
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <button
                  key={i}
                  onClick={() => handleNavigation(item.path, item.label)}
                  className={`
                    w-10 h-10 flex items-center justify-center
                    rounded-xl transition relative
                    ${
                      active
                        ? "bg-blue-500/20 text-blue-500"
                        : "text-[var(--text)] hover:bg-white/10"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {showBlogType && i === 2 && (
                    <Suspense fallback={<div>Loading...</div>}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 10 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute left-full z-50"
                      >
                        <BlogType setShowBlogType={setShowBlogType} />
                      </motion.div>
                    </Suspense>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SideNavBar;
