import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeCard from "../../cards/HomeCard";
import SkeletonPage from "./SkeltonHome";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../../reduxstore/slices";


function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.videoPlaying.videos);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs", {
          withCredentials: true,
        });
        const data = response.data.blogs;

        dispatch(setVideos(data));
        setLoading(false);
      } catch (error) {
        setMessage(error.response.data.error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  

  return (
    <div className="  w-full h-full overflow-hidden px-6 py-2 ">
      {loading ? (
        <div className="w-full h-full ">
          <SkeletonPage />
        </div>
      ) : (
        <div className=" flex  gap-6 flex-wrap w-full   h-full  overflow-auto hidescroolbar ">
          {blogs.map((item) => (
            <div key={item._id} className="w-[23rem] ">
              <HomeCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
