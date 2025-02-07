import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";

const Spinner = () => (
  <div className="w-full h-full flex justify-center items-center">
    <img
      src="/carloader.webp"
      alt="Loading..."
      className="w-full h-full aspect-video object-fill"
    />
  </div>
);

function CreateVideoBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie;
    if (!cookie.includes("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !coverImg || !video) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blogtype", "video");
    formData.append("video", video);
    formData.append("coverImg", coverImg);

    setLoading(true);

    try {
      const response = await axios.post("/api/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, 
      });

      if (response.data.message === "Blog created successfully") {
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
        setCoverImg(null);
        setVideo(null);
      } else {
        alert("Error creating blog");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 w-[45%] mx-auto h-screen border-3 bg-gray-400 overflow-auto">
      <h1 className="flex justify-center font-bold text-3xl py-5">
        ---UPLOAD VIDEO BLOG---
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col h-full w-full">
            {/* Select Video File */}
            <div className="relative w-full">
              <fieldset className="border-3 rounded-2xl mb-4">
                <legend className="mx-5 text-xl font-semibold">
                  Select Video File
                </legend>
                <input
                  type="file"
                  accept="video/*"
                  required
                  onChange={(e) => setVideo(e.target.files[0])}
                  className="w-full h-50 font-bold text-xl px-36 py-20 text-gray-700"
                />
                <label
                  className="flex justify-center items-center w-full text-lg font-semibold"
                >
                  <BsCloudUpload className="absolute top-[43%] left-[18%] text-4xl text-gray-700" />
                </label>
              </fieldset>
            </div>

            {/* Thumbnail File */}
            <div className="w-full relative">
              <fieldset className="border-3 rounded-2xl mb-4">
                <legend className="mx-5 text-xl font-semibold">
                  Thumbnail File
                </legend>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setCoverImg(e.target.files[0])}
                  className="w-full h-20 font-bold text-xl px-36 py-4 text-gray-700"
                />
                <label className="flex justify-center items-center w-full text-lg font-semibold">
                  <BsCloudUpload className="absolute top-[35%] left-[18%] text-4xl text-gray-700" />
                </label>
              </fieldset>
            </div>

            {/* Title */}
            <fieldset className="border-3 rounded-2xl mb-4 p-2">
              <legend className="mx-5 text-xl font-semibold">Title</legend>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-15 text-lg outline-none px-5"
              />
            </fieldset>

            {/* Description */}
            <fieldset className="border-3 rounded-xl mb-4 p-2">
              <legend className="mx-5 text-xl font-semibold">Description</legend>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-15 text-lg outline-none px-5"
              />
            </fieldset>

            {/* Submit Button */}
            <div className="py-2">
              <button
                type="submit"
                className="w-full border-3 py-1 text-xl font-bold rounded-xl hover:bg-blue-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateVideoBlog;
