import React, { useState,Suspense } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { motion } from "framer-motion"; // Import motion for animations

const BlogType = React.lazy(() => import("./pages/BlogType"))

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBlogType,setShowBlogType] = useState(false)
  return (
    <div>
      <nav className="w-full h-14 py-3 px-6 bg-amber-200 flex items-center">
        <div className="flex items-center justify-center bg-slate-100 gap-1 p-1 rounded-md h-full ">
          <IoSearchOutline className="flex items-center text-gray-500 mt-[2px] " />
          <input
            type="search"
            placeholder="Search blog"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex items-center border-none focus:outline-none "
          />
        </div>
        <div className="flex items-center justify-end w-full   gap-10 h-full ">
          <button className= "relative bg-white h-full flex justify-center items-center px-3 gap-1 rounded-2xl "   onClick={() => setShowBlogType(!showBlogType)}
          >
            <span className=" text-sm h-full flex items-center ">
              <FaPlus />
            </span>
            <span className=" h-full flex items-center ">Create</span>
            {showBlogType && (
                            <Suspense fallback={<div>Loading...</div>}>
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }} 
                                transition={{ duration: .5, ease: "easeInOut" }}
                                className="absolute -bottom-24  z-50"
                              >
                                <BlogType setShowBlogType={setShowBlogType} />
                              </motion.div>
                            </Suspense>
                          )}
          </button>

          <div className="bg-white flex items-center rounded-full  h-full">
            <button className="bg-white h-full flex justify-center items-center px-2 gap-1 rounded-2xl py-[2px] ">
              <img
                src="https://imgs.search.brave.com/3WZ_P1qGgTWlS-JwL-jDRzhAl5QBOFF0h0q8T2gnuA8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXByY2VudGVyLmdv/di9pbWFnZS1yZXBv/c2l0b3J5L2JsYW5r/LXByb2ZpbGUtcGlj/dHVyZS5wbmcvQEBp/bWFnZXMvaW1hZ2Uu/cG5n"
                className="  text-sm rounded-full h-full p-[2px]  aspect-square bg-slate-950"
              />
              <span className="flex items-center text-2xl h-full ">
                <IoSettingsOutline />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
