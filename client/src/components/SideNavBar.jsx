import React, {
  useState,
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiVideoDuotone } from "react-icons/pi";
import { PiImagesSquareFill } from "react-icons/pi";
import { GrNewWindow } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BlogType = React.lazy(() => import("./pages/BlogType"));

function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBlogType, setShowBlogType] = useState(false);
  const dropdownRef = useRef(null);

  const mySideNavBar = [
    { icon: IoHomeOutline, label: "Home", navigator: "/" },
    { icon: PiVideoDuotone, label: "Videos", navigator: "/videos" },
    { icon: PiImagesSquareFill, label: "Gallery", navigator: "/gallery" },
    { icon: GrNewWindow, label: "New Post", navigator: "/create" },
    { icon: MdOutlineAccountCircle, label: "Profile", navigator: "/profile" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBlogType(false);
      }
    }

    function handleScroll() {
      setShowBlogType(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = useCallback(
    (label, navigator) => {
      if (label === "New Post") {
        setShowBlogType((prev) => !prev);
      } else {
        setShowBlogType(false);
        navigate(navigator);
      }
    },
    [navigate]
  );

  return (
    <div className="h-screen bg-[var(--navbar)] w-20 py-4 flex flex-col items-center">
      <div className="flex flex-col gap-8">
        {mySideNavBar.map(({ icon: Icon, label, navigator }, index) => {
const isActive = navigator === "/" 
? location.pathname === navigator 
: location.pathname.startsWith(navigator);

          return (
            <div key={index} className="relative">
              <button
                className={`flex flex-col items-center transition duration-300 ${
                  isActive
                    ? "text-blue-500 font-bold"
                    : "hover:text-gray-800 text-[var(--text)]"
                }`}
                onClick={() => handleButtonClick(label, navigator)}
              >
                <Icon className="w-8 h-8" />
                <span className="text-xs mt-1">{label}</span>
              </button>

              {label === "New Post" && showBlogType && (
                <Suspense fallback={<div>Loading...</div>}>
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-12 -top-4 z-50 bg-white shadow-lg rounded-md"
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
  );
}

export default SideNavBar;
