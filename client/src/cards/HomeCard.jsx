import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function HomeCard({ item }) {
    const navigate = useNavigate();
    console.log(item)
  return (
    <div className="bg-[var(--bg-card)] p-2  w-full overflow-hidden rounded-lg flex flex-col gap-2 cursor-pointer" onClick={()=>navigate(`/${item._id}`)}>
      
        <img
          src={item.coverimgUrl}
          alt={item.title}
          className="w-full  aspect-video  object-cover rounded-lg"
        />
      <div className="flex flex-col px-2 py-2 ">
       
       <div className="flex items-center gap-3 h-10"> <img
          src={item.createdBy.profile }
          alt={`Profile `}
          className="w-8 h-8 aspect-square   bg-black rounded-full "
        />
                <p className=" font-medium leading-tight line-clamp-2  px-1 text-sm ">{item.title}</p>
</div>

        <div className="flex flex-col px-12 gap-1 justify-start">

          <p className="text-sm text-gray-400 font-semibold line-clamp-1 ">
            -{item.createdBy.userName}
          </p>
          <p className="text-xs line-clamp-1 flex gap-3  ">
            <span>{item.views} views</span>
            <span>{formatDistanceToNow(new Date(item.createdAt) )}</span>
            </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
