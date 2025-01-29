import React from "react";
import { useNavigate } from "react-router-dom";

function HomeCard({ item }) {
    const navigate = useNavigate();
  return (
    <div className="bg-slate-500 p-2  w-full overflow-hidden rounded-lg flex flex-col gap-2" onClick={()=>navigate(`/${item._id}`)}>
      {item.blogtype == "image" ? (
        <img
          src={item.coverimgUrl}
          alt={item.title}
          className="w-full aspect-video  object-cover rounded-lg"
        />
      ) : (
        <video
          src={item.videoUrl}
          controls
          className="w-full aspect-video  object-cover rounded-lg"
        />
      )}
      <div className="grid grid-cols-[3rem,calc(100%-3rem)] grid-rows-[3rem,100%]  gap-x-2  p-1 ">
        <img
          src={item.coverimgUrl}
          alt={`Profile `}
          className="w-full h-full mt-1  aspect-square   bg-black rounded-full "
        />
        <h1 className=" font-bold line-clamp-2 px-1">{item.title}</h1>

        <div className="flex flex-col col-start-2  gap-1 justify-start">
          <p className="text-sm text-gray-400 font-semibold line-clamp-1 ">
            -{item.createdBy}{" "}
          </p>
          <p className="text-xs line-clamp-1 flex gap-3  ">
            <span>1333 views</span>{" "}
            <span> {new Date(item.createdAt).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
