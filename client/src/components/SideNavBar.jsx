import React, { useState, Suspense } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiVideoDuotone } from "react-icons/pi";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { GrNewWindow } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 

const BlogType = React.lazy(() => import("./pages/BlogType")); 

function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [showBlogType, setShowBlogType] = useState(false);

  const mySideNavBar = [
    { icon: IoHomeOutline, label: "Home", navigator: "/" },
    { icon: PiVideoDuotone, label: "Videos", navigator: "/videos" },
    { icon: LiaPhotoVideoSolid, label: "Media", navigator: "/media" },
    { icon: GrNewWindow, label: "Create" },
    { icon: MdOutlineAccountCircle, label: "Profile", navigator: "/profile" },
  ];

  const handleButtonClick = (label, navigator) => {
    if (label === "Create") {
      setShowBlogType((prev) => !prev); 
    } else {
      setShowBlogType(false);
      navigate(navigator); 
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-16 items-center bg-[var(--navbar)] w-20 h-screen">
        <div className="h-14 w-full flex items-center justify-center">
          <img
            src="/logosns.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 relative">
          {mySideNavBar.map(({ icon: Icon, label, navigator }, index) => {
            const isActive = location.pathname === navigator;

            return (
              <div key={index} className="relative">
                <button
                  className={`flex flex-col items-center ${
                    isActive ? "text-blue-500 font-bold" : "hover:text-gray-800 focus:text-white"
                  }`}
                  onClick={() => handleButtonClick(label, navigator)}
                >
                  <Icon className="w-8 h-8" />
                  <span className="text-xs mt-1">{label}</span>
                </button>

                {label === "Create" && showBlogType && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }} 
                      transition={{ duration: .5, ease: "easeInOut" }}
                      className="absolute left-14 -top-4 z-50"
                    >
                      <BlogType setShowBlogType={setShowBlogType} />
                    </motion.div>
                  </Suspense>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
