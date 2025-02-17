import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeCard from "../../cards/HomeCard";
import SkeletonPage from "./SkeltonHome";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../../reduxstore/slices";
import { useNavigate } from "react-router";

function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.videoPlaying.videos);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Backend URL:', process.env.VITE_APP_BACKEND_URI);
        const response = await axios.get(`${process.env.VITE_APP_BACKEND_URI}/api/blogs`, {
          withCredentials: true,
        });
        console.log(response.data);
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
    <div className="  w-full h-full overflow-hidden flex justify-center items-start md:px-2  py-2 ">
      {loading ? (
        <div className="w-full h-full ">
          <SkeletonPage />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6 w-full h-full justify-center items-start overflow-auto hidescroolbar">
          {blogs.map((item) => (
            <div
              key={item._id}
              className="w-full md:max-w-[22rem]  mx-auto"
              onClick={() => navigate(`video/${item._id}`)}
            >
              <HomeCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
