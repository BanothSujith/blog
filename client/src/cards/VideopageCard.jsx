import React from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from 'date-fns/locale';


function VideoPageCard({ item }) {
  
const customLocale = {
  ...enUS,
  formatDistance: (token, count, options) => {
    const result = enUS.formatDistance(token, count, options);
    return result.replace(/^about /, ''); 
  },
};

  return (
    <div 
      className="bg-transparent md:px-2 py-2 w-full overflow-hidden rounded-lg flex gap-3 cursor-pointer" 
    >
      <img
        src={item?.coverimgUrl}
        alt={item.title}
        className="lg:w-[40%] h-24 aspect-video object-cover rounded-lg"
      />
      <div className="flex flex-col justify-between">
        <p className="font-medium leading-tight md:leading-normal text-sm md:text-[1rem] line-clamp-2 text-[var(--text)]">
          {item?.title}
        </p>
        <div className="flex items-center gap-2">
          <img
            src={item?.profile}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="text-xs md:text-[.5rem] flex-col text-[var(--text)] flex">
            <p className="text-sm md:text-[.8rem] text-[var(--text)] font-semibold line-clamp-1">
              {item.userName}
            </p>
            <p className="flex gap-4 justify-between">
              <span>{item.views} views</span>
              <span>
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                  locale: customLocale,
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPageCard;
