import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function VideoPageCard({ item  }) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-[var(--bg-card)]  px-2 py-2 w-full overflow-hidden rounded-lg flex gap-3 cursor-pointer" 
      onClick={() => navigate(`/${item._id}`)}
    >
      {/* Left Side: Video Thumbnail */}
      <img
        src={item.coverimgUrl}
        alt={item.title}
        className="w-[40%] aspect-video object-cover rounded-lg"
      />

      {/* Right Side: Video Details */}
      <div className="flex flex-col justify-between w-[60%]">
        {/* Title */}
        <p className="font-medium leading-tight text-sm line-clamp-2 text-[var(--text)]">
          {item.title}
        </p>

        {/* Profile Image & Name */}
        <div className="flex items-center gap-2 ">
          <img
            src={item.coverimgUrl}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="text-xs flex-col text-[var(--text)] flex ">
          <p className="text-sm text-[var(--text)] font-semibold line-clamp-1">
            {item.creatorName}
          </p>
          <p className="flex gap-4 justify-between">
          <span>{item.views} views </span>
          <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
          </p>  </div>
         
        </div>

        {/* Views & Timestamp */}
        
      </div>
    </div>
  );
}

export default VideoPageCard;
