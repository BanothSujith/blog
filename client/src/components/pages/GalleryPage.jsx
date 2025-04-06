import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGalleryVideos } from "../../reduxstore/slices";
import SkeletonPage from "./SkeltonHome";
import Message from "../../utility/Message";
import { useNavigate } from "react-router";
import GalleryCard from "../../cards/Gallerycard";

function GalleryPage() {
  const [likeStatus, setLikeStatus] = useState({});
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const galleryBlogs =
    useSelector((state) => state.videoPlaying.galleryVideos) || [];

  useEffect(() => {
    const fetchGalleryBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URI}/gallery`,
          { withCredentials: true }
        );
        setLoading(false);
        if (response.data?.galleryBlogs) {
          dispatch(setGalleryVideos(response.data.galleryBlogs));
          const initialLikeStatus = {};
          response.data.galleryBlogs.forEach((post) => {
            initialLikeStatus[post._id] = {
              liked: post.isLiked || false,
              unliked: post.isUnliked || false,
              likeCount: post.likeCount || 0,
              unlikeCount: post.unlikeCount || 0,
            };
          });
          setLikeStatus(initialLikeStatus);
        }
      } catch (error) {
        console.error("Error from server:", error);
      }
    };

    fetchGalleryBlogs();
  }, []);

  const toggleLike = async (postId) => {
    try {
      const updatedLikeStatus = { ...likeStatus };
      const post = updatedLikeStatus[postId];

      const newLikedState = !post.liked;
      const newUnlikedState = false;
      let newLikeCount = post.likeCount;
      let newUnlikeCount = post.unlikeCount;

      if (newLikedState) {
        newLikeCount += 1;
        if (post.unliked) newUnlikeCount -= 1;
      } else {
        newLikeCount -= 1;
      }

      updatedLikeStatus[postId] = {
        liked: newLikedState,
        unliked: newUnlikedState,
        likeCount: newLikeCount,
        unlikeCount: newUnlikeCount,
      };

      setLikeStatus(updatedLikeStatus);

      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/like/${postId}`,
        { liked: newLikedState },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const toggleUnlike = async (postId) => {
    try {
      const updatedLikeStatus = { ...likeStatus };
      const post = updatedLikeStatus[postId];

      const newUnlikedState = !post.unliked;
      const newLikedState = false;
      let newUnlikeCount = post.unlikeCount;
      let newLikeCount = post.likeCount;

      if (newUnlikedState) {
        newUnlikeCount += 1;
        if (post.liked) newLikeCount -= 1;
      } else {
        newUnlikeCount -= 1;
      }

      updatedLikeStatus[postId] = {
        liked: newLikedState,
        unliked: newUnlikedState,
        likeCount: newLikeCount,
        unlikeCount: newUnlikeCount,
      };

      setLikeStatus(updatedLikeStatus);
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/unlike/${postId}`,
        { unliked: newUnlikedState },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleSubscribe = async (e, id) => {
    e.stopPropagation();
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URI}/subscribe`,
      { channelId: id },
      { withCredentials: true }
    );

    if (
      response.data.error === "Unauthorized, token not provided." ||
      response.data.error === "Invalid token."
    ) {
      Message("Please login to subscribe", "Error");
      return navigate("/login");
    }

    const updatedgalleryblog = galleryBlogs.map((item) =>
      item.owner._id === id
        ? {
            ...item,
            isSubscribed: response.data.message === "Subscribed successfully",
            owner: {
              ...item.owner,
              subscribers:
                item.owner.subscribers +
                (response.data.message === "Subscribed successfully" ? 1 : -1),
            },
          }
        : item
    );
    dispatch(setGalleryVideos(updatedgalleryblog));
    Message(response.data.message, "OK");
  };

  return (
    <div className="w-full h-full p-2 pb-28 md:pb-36 lg:pb-20 overflow-auto">
      {Loading ? (
        <SkeletonPage />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-4 items-center justify-center">
          {galleryBlogs.length > 0 ? (
            galleryBlogs.map((data) => (
              <GalleryCard
                key={data._id}
                data={data}
                likeStatus={likeStatus}
                toggleLike={toggleLike}
                toggleUnlike={toggleUnlike}
                handleSubscribe={handleSubscribe}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 w-full">
              No posts available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
