import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  BsHeart,
  BsHeartFill,
  BsHeartbreak,
  BsHeartbreakFill,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const cardsInfo = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
function GalleryPage() {
    const [descriptionExpand, setDescriptionExpand] = useState(null)
  return (
    <div className="w-full h-full p-2  overflow-auto">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-center justify-center">
        {cardsInfo.map((card) => (
          <div
            key={card.id}
            className="bg-[var(--bg-card)] p-2 flex flex-col gap-3 w-full aspect-square"
          >
            <div className="flex gap-4 items-center text-[var(--text)]">
              <img
                src={user.profile}
                alt="Profile"
                className="rounded-full w-8 aspect-square"
              />
              <p className="flex flex-col leading-none">
                <span className="font-semibold text-xl leading-none">
                  {user.userName}
                </span>
                <span className="text-xs">10k subscribers</span>
              </p>
            </div>
            <div className="h-full w-full flex flex-col gap-1">
              <img
                src={user.profile}
                alt="Uploaded Image"
                className="w-full h-[900px] border object-cover"
              />
              <p className="flex gap-6 px-4  items-center text-2xl">
                <span className="text-[#eb6b91] cursor-pointer">
                  {0 ? <BsHeart /> : <BsHeartFill />}
                </span>
                <span className="text-[#eb6b91] ">
                  {0 ? <BsHeartbreak /> : <BsHeartbreakFill />}
                </span>
                <span className="text-[#4eb3d5]">
                  <FaRegComment />
                </span>
              </p>
              <p className=" w-full text-[var(--text)]">
                <span className={`${descriptionExpand == card.id? "" : "line-clamp-2"} text-sm leading-tight font-semibold`}>disajdnkjds kjdbglkj sdn mg kjng vl kj sdnmg lkjn mj glkv dg lknc bvgl kxcvf nbv jxmcn bv njcv,mndvv nm njcn bkjmcnx </span>
                <button onClick={()=>setDescriptionExpand((prev)=> prev === card.id ? null : card.id)} className="w-full text-right text-xs">{descriptionExpand === card.id? "Read less" : "Read more"}</button>
              </p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;
