import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LuSendHorizontal } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoPageCard from "../../cards/VideopageCard";
import { useSelector } from "react-redux";

function VideoPage() {
  const { video } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState(null);
  const [commentSendButton, setCommentSendButton] = useState(true);

  const relatedBlogs = useSelector((state) => state.videoPlaying.videos);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/api/video/${video}`, { withCredentials: true });
        setVideoData(response.data.video);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [video]);

  useEffect(() => {
    if (videoData?.createdBy) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`/api/user/${videoData.createdBy}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [videoData?.createdBy]); 

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    
    setCommentSendButton(true);
    try {
      const data = await axios.post(`/api/${video}/comments`, { comment }, { withCredentials: true });

      if (data.statusText === "Created") {
        setComment("");
        setMessage("Comment sent successfully");
      }
    } catch (error) {
      console.error("Failed to send comment:", error);
    } finally {
      setCommentSendButton(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      {/* Video Player */}
      <video
        src={videoData?.videoUrl}
        controls
        controlsList="nodownload"
        className="w-full h-[80vh]"
      />

      <div className="w-full h-full flex px-4 gap-12">
        {/* Left Section (Video Details & Comments) */}
        <div className="w-[60%] flex flex-col gap-4 text-[var(--text)] py-2">
          <p className="text-xl font-bold w-full line-clamp-2">{videoData?.title}</p>

          {/* User Info */}
          <div className="flex w-full items-center">
            <img
              src={userData?.profile || "/default-avatar.png"}
              alt="User Avatar"
              className="h-12 w-12 rounded-full object-center object-cover aspect-square bg-gray-400"
            />
            <p className="line-clamp-2 px-4 text-lg font-bold">{userData?.name || "Anonymous"}</p>
          </div>
                             
          {/* Video Description */}
          <div className="w-full h-20 my-4">
            <fieldset className="w-full h-full border-2 border-[var(--text)] px-4 overflow-auto hidescroolbar rounded-md">
              <legend className="text-xl">Description</legend>
              <p className="text-sm">{videoData?.content || "No Description Available"}</p>
            </fieldset>
          </div>

          {/* Comment Input */}
          <div className="flex w-full items-center gap-8 justify-between">
            <input
              type="text"
              placeholder="Comment here..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setCommentSendButton(!e.target.value.trim()); 
              }}
              className="w-full h-12 rounded-md border-2 border-[var(--text)] px-4 outline-none bg-transparent"
            />
            <button
              disabled={commentSendButton}
              onClick={handleSubmit}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              <LuSendHorizontal className="text-3xl" />
            </button>
          </div>

          {/* Comments Section */}
          <h1 className="text-2xl font-semibold capitalize">
            {videoData?.comments?.length || 0} comments
          </h1>
          <div className="flex flex-col">
            {videoData?.comments?.map((comment, index) => (
              <div key={index} className="w-full p-2 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold">-{comment?.creatorName || "Anonymous"}</p>
                  <p className="text-[gray] text-sm px-2">{comment?.content}</p>
                </div>
                <span><BsThreeDotsVertical /></span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Related Videos) */}
        <div className="h-full w-[35%] border-l-2 px-4  ">
          <h1 className="text-2xl text-[var(--text)] font-semibold p-4">Related Videos</h1>
          <div className="flex flex-col gap-2 ">
            {relatedBlogs?.map((item) => (
              <div key={item._id}>
                <VideoPageCard item={item} />
              </div>
            )) || <p className="p-4 text-[var(--text)]">No related videos found</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
