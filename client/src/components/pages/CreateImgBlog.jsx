import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import Message from "../../utility/Message";

const imageFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function CreateImgBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Message("Please login to create a blog.", "warning");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !coverImg) {
      Message("Please fill in all fields and upload an image.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImg", coverImg);

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URI}/img`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.message === "Blog created successfully") {
        Message("Blog Posted Successfully!", "OK");
        setTitle("");
        setContent("");
        setCoverImg(null);
        navigate("/");
      } else {
        Message("Creating blog failed.", "error");
      }
    } catch (error) {
      console.error(error);
      Message("Cannot upload the post, please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive,
  } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && imageFormats.includes(file.type)) {
        setCoverImg(file);
      } else {
        Message("Only image files are allowed!", "warning");
      }
    },
  });

return (
  <div className="h-screen bg-[#0a0a0a] text-white flex  justify-center px-4 py-2">
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-5xl
        grid lg:grid-cols-2
        overflow-scroll
        overflow-x-hidden
        hidescroolbar
        rounded-[2rem]
        border border-white/10
        bg-[#111]
        shadow-[0_0_80px_rgba(0,0,0,0.6)]
      "
    >
      {/* LEFT SIDE */}
      <div className="relative p-8 md:p-10 border-r border-white/10">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            absolute top-5 right-5
            w-9 h-9
            rounded-full
            bg-white/5
            hover:bg-red-500
            transition-all duration-300
          "
        >
          ✕
        </button>

        {/* Heading */}
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-3">
            Creator Studio
          </p>

          <h1 className="text-5xl font-black leading-tight">
            Upload
            <span className="block text-zinc-500">
              Image Blog
            </span>
          </h1>
        </div>

        {/* Upload Area */}
        <div
          {...getThumbnailRootProps()}
          className={`
            group
            relative
            h-[350px]
            rounded-3xl
            border
            overflow-hidden
            cursor-pointer
            transition-all duration-500
            flex flex-col items-center justify-center
            ${
              isThumbnailDragActive
                ? "border-pink-400 bg-pink-400/10"
                : "border-white/10 hover:border-pink-500"
            }
          `}
        >
          <input {...getThumbnailInputProps()} accept="image/*" />

          {/* Glow */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-pink-500/10
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-all duration-500
            "
          />

          {coverImg ? (
            <div className="z-10 flex flex-col items-center px-6">
              {/* Preview */}
              <img
                src={URL.createObjectURL(coverImg)}
                alt="preview"
                className="
                  w-52 h-52
                  object-cover
                  rounded-2xl
                  mb-5
                  border border-white/10
                "
              />

              <p className="font-bold text-lg break-all text-center">
                {coverImg.name}
              </p>

              <p className="text-zinc-500 text-sm mt-2">
                Image ready to upload
              </p>
            </div>
          ) : (
            <div className="z-10 text-center">
              <BsCloudUpload className="text-7xl text-pink-400 mx-auto mb-5" />

              <p className="text-2xl font-bold">
                Drop your image
              </p>

              <p className="text-zinc-500 mt-2">
                PNG, JPG, WEBP supported
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-8 md:p-10 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <label className="text-sm text-zinc-500 uppercase tracking-[0.2em]">
              Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="
                w-full
                mt-3
                bg-transparent
                border-b border-white/10
                focus:border-pink-500
                outline-none
                py-4
                text-3xl
                font-bold
                transition-all
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-zinc-500 uppercase tracking-[0.2em]">
              Description
            </label>

            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              placeholder="Write your thoughts..."
              className="
                w-full
                mt-3
                bg-[#0d0d0d]
                border border-white/10
                focus:border-pink-500
                rounded-3xl
                p-6
                outline-none
                resize-none
                text-lg
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-10
            h-16
            rounded-2xl
            text-lg
            font-bold
            bg-white
            text-black
            hover:bg-pink-400
            hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]
            transition-all duration-300
            active:scale-[0.98]
          "
        >
          {loading ? "Uploading..." : "Publish Blog"}
        </button>
      </div>
    </form>
  </div>
);

}

export default CreateImgBlog;
