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
      className="relative text-[var(--text)] p-1 h-full cursor-pointer"
      onClick={handleNavigate}
    >
      <div
        className="absolute top-5 right-2 cursor-pointer"
        onClick={(e) => e.stopPropagation()} ref={haddleoutclick}
      >
        <div onClick={handleOptionsToggle} className="relative text-gray-800">
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
      <div>
        <img
          src={blog.coverimgUrl || "/default.jpg"}
          alt="Cover"
          className="w-full aspect-square object-fill rounded-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col gap-1 px-2 mt-2">
        <p className="font-bold text-lg line-clamp-2 leading-tight">
          {blog.title || "Untitled"}
        </p>
        <p className="flex gap-3 text-xs font-semibold">
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
