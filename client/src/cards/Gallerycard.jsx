import React, { useState } from "react";
import {
  BsHeart,
  BsHeartFill,
  BsHeartbreak,
  BsHeartbreakFill,
} from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";

function GalleryCard({
  data,
  likeStatus,
  toggleLike,
  toggleUnlike,
  handleSubscribe,
}) {
  const navigate = useNavigate();
  const [isProfileLoading, setProfileLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <div
      key={data._id}
      className="bg-[var(--bg-card)] p-1 rounded-lg flex flex-col gap-3 w-full h-[26rem] aspect-square"
    >
      {/* User Info */}
      <div
        className="flex gap-4 items-center text-[var(--text)] cursor-pointer"
        onClick={() => {
          navigate(`/user/${data.owner._id}`);
        }}
      >
        <div className="relative w-8 h-8">
          {isProfileLoading && (
            <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[var(--smallcard)] animate-pulse" />
          )}
          <img
            src={data.owner?.profile || "https://via.placeholder.com/150"}
            alt="Profile"
            onLoad={() => setProfileLoading(false)}
            className={`rounded-full w-8 h-8 object-cover transition-opacity duration-300 ${
              isProfileLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <p className="flex flex-col leading-none">
          <span className="font-semibold text-lg line-clamp-1 leading-none">
            {data?.owner?.userName || "Anonymous"}
          </span>
          <span className="flex gap-1 items-center text-sm font-semibold">
            <AnimatePresence mode="wait">
              <motion.span
                key={data?.owner?.subscribers}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {data?.owner?.subscribers || 0}
              </motion.span>
            </AnimatePresence>
            subscribers
          </span>
        </p>
        <button
          onClick={(e) => handleSubscribe(e, data.owner._id)}
          className="relative group capitalize md:mx-4 px-4 w-fit py-1 active:scale-95 border border-[#f1a6a6] overflow-hidden rounded-sm text-[var(--text)]"
        >
          <span className="relative z-10">
            {data?.isSubscribed ? "subscribed" : "subscribe"}
          </span>
          <span className="absolute left-0 top-0 h-full w-full bg-[#ac2424] transform -translate-x-full lg:group-hover:translate-x-0  active:scale-95 transition-transform duration-300 ease-in-out"></span>
        </button>
      </div>

      {/* Image & Actions */}
      <div className="h-full w-full flex flex-col gap-2">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          {isImageLoading && (
            <div className="absolute top-0 left-0 h-full w-full bg-[var(--smallcard)] animate-pulse z-0" />
          )}
          <img
            src={data.coverimgUrl}
            alt="Uploaded"
            onLoad={() => setImageLoading(false)}
            className={`w-full h-64 object-fill transition-opacity duration-300 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Like, Dislike, Comment */}
        <p className="flex gap-6 px-4 items-center text-2xl">
          <span
            className="text-[#eb6b91] cursor-pointer flex flex-row-reverse gap-2 items-center justify-center"
            onClick={() => toggleLike(data._id)}
          >
            {likeStatus[data._id]?.liked ? <BsHeartFill /> : <BsHeart />}
            <AnimatePresence mode="wait">
              <motion.span
                key={likeStatus[data._id]?.likeCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ rotate: 360, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                {likeStatus[data._id]?.likeCount}
              </motion.span>
            </AnimatePresence>
          </span>

          <span
            className="text-[#eb6b91] cursor-pointer flex flex-row-reverse gap-2 items-center justify-center"
            onClick={() => toggleUnlike(data._id)}
          >
            {likeStatus[data._id]?.unliked ? (
              <BsHeartbreakFill />
            ) : (
              <BsHeartbreak />
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={likeStatus[data._id]?.unlikeCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ rotate: 360, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                {likeStatus[data._id]?.unlikeCount}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>

        {/* Description */}
        <p className="w-full px-2 text-[var(--text)]">
          <span className="w-full text-[var(--text)] text-xs">
            {formatDistanceToNow(new Date(data?.createdAt), {
              addSuffix: true,
            })}
          </span>
          <span className="text-sm leading-tight font-semibold line-clamp-2">
            {data?.title}
          </span>
        </p>
      </div>
    </div>
  );
}

export default GalleryCard;
