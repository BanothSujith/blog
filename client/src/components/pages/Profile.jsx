import React, { useState, useEffect } from "react";
import defaultprofile from "/src/assets/defaultprofile.png";
import bgimgforprofile from "/src/assets/bgimgforprofile.png";
import axios from "axios";
import ProfileCards from "../../cards/ProfileCards";
import { useParams } from "react-router";

const categories = ["All", "Video", "Image"];

const Profilepage = () => {
  const [profile, setProfile] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState("All");
  const { userprofile } = useParams();
  const [resData,setResData] = useState(null)
  useEffect(() => {
    if (resData) {
      setBlogs((prevBlogs) => prevBlogs.filter((item) => item._id !== resData));
    }
  }, [resData]);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URI}/user/${userprofile}`,
          { withCredentials: true }
        );
        setProfile(response.data.user);
        setBlogs(response.data.user.blogs || []);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userprofile]);

  const handleFilterBlogs = (item) => {
    setFilteredBlogs(item);
  };

  const filteredList = blogs.filter(
    (item) =>
      filteredBlogs === "All" ||
      item.blogtype === filteredBlogs.toLowerCase()
  );

  return (
    <div className="h-full bg-[var(--bg-color)] overflow-auto pb-12">
      {/* Background Image and Profile */}
      <div className="relative h-[20vh] lg:h-[40vh]">
        <img
          src={profile.coverImg || bgimgforprofile}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-1/2 md:-bottom-32 left-2 aspect-square rounded-full">
          <img
            src={profile.profile || defaultprofile}
            alt="Profile"
            className="rounded-full w-28 md:w-60 aspect-square bg-[var(--bg-color)] p-1 object-cover object-top"
          />
        </div>
      </div>

      {/* Username, Subscribers, Blogs */}
      <div className="flex flex-col md:gap-2 pl-32 md:pl-72 text-[var(--text)] capitalize pb-4">
        <h1 className="text-2xl md:text-5xl font-semibold line-clamp-1">
          {profile.userName || "Guest"}
        </h1>
        <div className="flex gap-4 text-sm md:text-xl">
          <p>{profile.subscribersCount || 0} subscribers</p>
          <p>{profile.totalBlogCount || 0} Blogs</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="w-full px-2 mt-12">
        <nav className="flex gap-1 md:gap-2 p-1">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`text-[var(--text)] font-bold px-4 py-2 ${
                category === filteredBlogs
                  ? "bg-[var(--smallcard)]"
                  : "bg-[var(--bg-color)]"
              } flex-1 transition duration-300 rounded`}
              onClick={() => handleFilterBlogs(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12 md:p-4">
        {filteredList.length > 0 ? (
          filteredList.map((blog) => (
            <ProfileCards key={blog._id} blog={blog} setResData={setResData} />
          ))
        ) : (
          <p className="text-center text-[var(--text)] col-span-full">
            No blogs available
          </p>
        )}
      </div>
    </div>
  );
};

export default Profilepage;
