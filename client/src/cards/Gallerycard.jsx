import React, { useState } from "react";
import {
  BsHeart,
  BsHeartFill,
  BsHeartbreak,
  BsHeartbreakFill,
} from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className=" mb-5 rounded-3xl overflow-hidden border  border-white/10 backdrop-blur-xl shadow-2xl group "
    >
      {" "}
      {/* Image */}{" "}
      <div className="relative overflow-hidden">
        {" "}
        {isImageLoading && (
          <div className="absolute inset-0 bg-white/10 animate-pulse z-10" />
        )}{" "}
        <img
          src={data.coverimgUrl}
          alt="post"
          onLoad={() => setImageLoading(false)}
          className={` w-full object-cover transition-all duration-700 group-hover:scale-105 ${isImageLoading ? "opacity-0" : "opacity-100"} `}
        />{" "}
        {/* Overlay */}{" "}
        <div className=" absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 " />{" "}
      </div>{" "}
      {/* Content */}{" "}
      <div className="p-4">
        {" "}
        {/* User */}{" "}
        <div
          onClick={() => navigate(`/user/${data.owner._id}`)}
          className="flex items-center justify-between cursor-pointer"
        >
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="relative">
              {" "}
              {isProfileLoading && (
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              )}{" "}
              <img
                src={data.owner?.profile || "https://via.placeholder.com/150"}
                alt="profile"
                onLoad={() => setProfileLoading(false)}
                className={` w-12 h-12 rounded-full object-cover border-2 border-cyan-400 ${isProfileLoading ? "opacity-0" : "opacity-100"} `}
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <h2 className="text-[var(--text)] font-semibold line-clamp-1">
                {" "}
                {data?.owner?.userName || "Anonymous"}{" "}
              </h2>{" "}
              <p className="text-gray-400 text-sm">
                {" "}
                {data?.owner?.subscribers || 0} subscribers{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <button
            onClick={(e) => handleSubscribe(e, data.owner._id)}
            className={` px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${data?.isSubscribed ? "bg-green-500/20 text-[#0b853a] border border-green-400/30" : "bg-cyan-500/20 text-[#0534b4] border border-cyan-400/30 hover:bg-cyan-500/30"} `}
          >
            {" "}
            {data?.isSubscribed ? "Subscribed" : "Subscribe"}{" "}
          </button>{" "}
        </div>{" "}
        {/* Title */}{" "}
        <div className="mt-4">
          {" "}
          <p className="text-gray-400 text-xs">
            {" "}
            {formatDistanceToNow(new Date(data?.createdAt), {
              addSuffix: true,
            })}{" "}
          </p>{" "}
          <h3 className="text-[var(--text)] font-semibold text-lg mt-1 line-clamp-2">
            {" "}
            {data?.title}{" "}
          </h3>{" "}
        </div>{" "}
        {/* Actions */}{" "}
        <div className="flex items-center gap-6 mt-3">
          {" "}
          {/* Like */}{" "}
          <button
            onClick={() => toggleLike(data._id)}
            className="flex items-center gap-2 text-pink-400 hover:scale-110 transition"
          >
            {" "}
            {likeStatus[data._id]?.liked ? (
              <BsHeartFill size={22} />
            ) : (
              <BsHeart size={22} />
            )}{" "}
            <AnimatePresence mode="wait">
              {" "}
              <motion.span
                key={likeStatus[data._id]?.likeCount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {" "}
                {likeStatus[data._id]?.likeCount}{" "}
              </motion.span>{" "}
            </AnimatePresence>{" "}
          </button>{" "}
          {/* Unlike */}{" "}
          <button
            onClick={() => toggleUnlike(data._id)}
            className="flex items-center gap-2 text-red-400 hover:scale-110 transition"
          >
            {" "}
            {likeStatus[data._id]?.unliked ? (
              <BsHeartbreakFill size={22} />
            ) : (
              <BsHeartbreak size={22} />
            )}{" "}
            <AnimatePresence mode="wait">
              {" "}
              <motion.span
                key={likeStatus[data._id]?.unlikeCount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {" "}
                {likeStatus[data._id]?.unlikeCount}{" "}
              </motion.span>{" "}
            </AnimatePresence>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
export default GalleryCard;
