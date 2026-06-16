import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function HomeCard({ item }) {
  const [isImgLoading, setImgLoading] = useState(true);
  const [isprofileloading, setProfileLoading] = useState(true);

  return (
    <div className="bg-transparent h-full w-full overflow- rounded-lg flex flex-col cursor-pointer text-[var(--text)] hover:shadow-[0_.2rem_1px] transition-all duration-75 transform-3d hover:shadow-[var(--shodow)] ">
      <div className="w-full h-full aspect-video md:rounded-2xl overflow-hidden relative">
        {isImgLoading && (
          <div className="w-full h-full bg-[var(--smallcard)] animate-pulse absolute top-0 left-0 z-0" />
        )}
        <img
          src={item.coverimgUrl}
          alt="cover"
          onLoad={() => setImgLoading(false)}
          loading="lazy"
          className={`w-full h-full object-fill object-top transition-opacity duration-300 ${
            isImgLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="flex flex-col  px-2 py-1">
        <div className="relative flex items-center gap-3 h-full">
          {isprofileloading && (
            <div className="w-[clamp(2.1rem,2vw,150px)] aspect-square bg-[var(--smallcard)] rounded-full animate-pulse absolute top-2 left-0 z-0" />
          )}
          <img
            src={item.profile}
            alt={`Profile`}
            loading="lazy"
            onLoad={() => setProfileLoading(false)}
            className={`w-[clamp(2.1rem,2vw,150px)] aspect-square object-cover rounded-full translate-y-2 ${
              isprofileloading ? "opacity-0" : "opacity-100"
            }`}
          />
          <p className="font-medium leading-tight line-clamp-2 px-1 text-[max(0.9rem,1vw)]">
            {item.title}
          </p>
        </div>

        <div className="flex flex-col px-12 pb-2 gap-1 justify-center items-start">
          <p className="text-[max(0.9rem,1vw)] text-[#164775] font-semibold line-clamp-1 capitalize">
            ~{item?.userName}
          </p>
          <p className="text-[max(0.7rem,.7vw)] line-clamp-1 flex gap-3">
            <span>{item.views} views</span>
            <span>
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
