import React, { useState, Suspense, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

function ProfileCards({ blog,setResData }) {
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const [CommentDeleteComp, setCommentDeleteComp] = useState(null);
  const {userprofile} = useParams();
  const haddleoutclick = useRef();
  
  if (!blog || typeof blog !== "object") {
    return <p>Error: Invalid blog data</p>;
  }

  const handleNavigate = () => {
    if (blog.blogtype === "video") {
      navigate(`/video/${blog._id}`);
    }
  };

  const handleOptionsToggle = async () => {
    setOptions((prev) => !prev);
    if (!CommentDeleteComp) {
      const module = await import("../components/pages/CommentDelete");
      setCommentDeleteComp(() => module.default);
    }
  };

  return (
    <div
      className="relative text-[var(--text)] px-2 py-2 w-full h-full cursor-pointer bg-[var(--body)] rounded-lg pb-3 overflow-hidden backdrop-blur-xl hover:shadow-[0px_5px_15px] hover:shadow-[var(--shadow-2t)] transition-all duration-1000 ease-in-out"
      onClick={handleNavigate}
    >
      <div
        className="absolute top-3 right-2 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
        ref={haddleoutclick}
      >
        <div
          onClick={handleOptionsToggle}
          className="relative bg-black/40 py-1 rounded-md text-white "
        >
          <BsThreeDotsVertical />
          <AnimatePresence mode="wait">
            {options && CommentDeleteComp && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute -bottom-4 right-5"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <CommentDeleteComp
                    ownerid={userprofile}
                    commentid={""}
                    id={blog?._id}
                    setResData={setResData}
                    endpoint={`deleteblog/${blog?._id}`}
                    onClose={() => setOptions(false)}
                  />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative group overflow-hidden">
        <img
          src={blog.coverimgUrl || "/default.jpg"}
          alt="Cover"
          className="w-full aspect-video  group-hover:scale-110 transition-transform duration-1000"
        />
        <div
          className=" absolute inset-0
              bg-gradient-to-t
              from-black
              via-black/30
              to-transparent
              translate-y-[20%]
               group-hover:translate-y-0
              transition-all duration-1000
               "
        />
        <div
          className="
              absolute inset-0
              bg-gradient-to-r
              from-transparent
              via-[#27d8df]
              opacity-20
              to-transparent
              -translate-x-full
              group-hover:translate-x-full
              transition-all duration-1000
              
            "
        />
      </div>

      {/* Blog Content */}
      <div className=" grid grid-rows-2  px-2 mt-2">
        <p className="font-bold text-[clamp(1rem,1.5vw,2rem)] line-clamp-2 leading-tight ">
          {blog.title || "Untitled"}
        </p>
        <p className="translate-y-3 flex gap-3  text-xs font-semibold">
          <span>{blog.views || 0} views</span>
          <span>
            {formatDistanceToNow(new Date(blog.createdAt), {
              addSuffix: true,
            })}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProfileCards;
