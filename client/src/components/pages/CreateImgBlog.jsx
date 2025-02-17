import React, { useState } from "react";
import axios from "axios";

const Spinner = () => (
  <div className="w-full h-full flex justify-center items-center">
    <img
      src="/carloader.webp"
      alt="Loading..."
      className="w-full h-full aspect-video object-fill"
    />
  </div>
);

function CreateImgBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCoverImgChange = (e) => setCoverImg(e.target.files[0]);

  const cookie = document.cookie;
  if (!cookie.includes("token")) {
    window.location.href = "/login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !coverImg ) {
      alert("Please fill in all fields and upload both files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImg", coverImg);
    
    
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URI}/api/img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Blog created successfully") {
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
        setBlogType("");
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
    <div className="w-1/2 h-full mx-auto p-6 bg-white shadow-md rounded-md overflow-auto hidescroolbar">
      <h2 className="text-2xl font-bold text-center mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          />
        </div>

       

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="coverImg">
            Cover Image:
          </label>
          <input
            type="file"
            id="coverImg"
            onChange={handleCoverImgChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="video">
            Video:
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Submit Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateImgBlog;
