import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import Message from "../../utility/Message";


const videoFormats = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/mov",
  "video/mkv",
  "video/avi",
];
const imageFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
function CreateVideoBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !coverImg || !video) {
      Message("Please fill in all fields and upload both files.", "warning");
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
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/video`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.message === "Blog created successfully") {
        Message("Blog Posted Successfully!", "OK");
        setTitle("");
        setContent("");
        setCoverImg(null);
        setVideo(null);
        navigate("/");
      } else {
        Message("Error creating blog", "error");
      }
    } catch (error) {
      console.error(error);
      Message("Cannot upload the post, please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isVideoDragActive: isVideoDragActive,
  } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && videoFormats.includes(file.type)) {
        setVideo(file);
      } else {
        Message("Only video files are allowed!", "warning");
      }
    },
  });

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
    <div className="lg:p-4 flex flex-col gap-8 items-center h-screen overflow-hidden  ">
      <form
        onSubmit={handleSubmit}
        className="relative space-y-6 bg-[var(--bg-card)] p-4 rounded-lg h-full overflow-auto hidescroolbar"
      >
        {/* Video Upload */}
        <div
          className="absolute top-1 right-1 bg-red-600 w-3 flex items-center justify-center text-white h-3 text-xs pb-[1px] rounded-full hover:bg-red-900 active:scale-95 transition-all duration-75 ease-linear cursor-pointer"
          onClick={() => window.history.back()}
        >
          x
        </div>
        <h1 className=" text-3xl capitalize text-center font-bold text-[var(--text)] ">
          upload video blog
        </h1>
        <div
          {...getVideoRootProps()}
          className={`w-[20rem] md:w-[32rem]  border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition ${
            isVideoDragActive
              ? "border-blue-500 bg-blue-100"
              : "border-[var(--border)]  hover:bg-[var(--inputBg)]"
          }`}
        >
          <BsCloudUpload className="text-4xl text-[var(--text)] mb-2 mx-auto opacity-25" />
          <input {...getVideoInputProps()} accept="video/*" />
          {video ? (
            <p className="text-[var(--text)]  font-bold">{video.name}</p>
          ) : (
            <p className="text-[var(--text)] font-bold opacity-20">
              Drag & Drop or Click to upload video
            </p>
          )}
        </div>
        {/* Thumbnail Upload */}

        <div
          {...getThumbnailRootProps()}
          className={`w-[20rem] md:w-[32rem] border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
            isVideoDragActive
              ? "border-blue-500 bg-blue-100"
              : "border-[var(--border)]  hover:bg-[var(--inputBg)]"
          }`}
        >
          <BsCloudUpload className="text-4xl text-[var(--text)] mb-2 mx-auto opacity-25" />
          <input {...getThumbnailInputProps()} accept="image/*" />

          {coverImg ? (
            <p className="text-[var(--text)] font-bold ">{coverImg.name}</p>
          ) : (
            <p className="text-[var(--text)] font-bold opacity-20">
              Drag & Drop or Click to upload thumbnail
            </p>
          )}
        </div>
        <div>
          <label className=" text-xl tracking-wider text-[var(--text)] font-semibold">
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full hover:bg-[var(--bg-body)]  p-3 border-[1.5px] border-[var(--border)] rounded-lg outline-none bg-transparent focus:bg-[var(--inputBg) text-[var(--text)]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xl tracking-wider text-[var(--text)] font-semibold">
            Description
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border-[1.5px] text-[var(--text)] border-[var(--border)] outline-none bg-transparent rounded-lg hover:bg-[var(--bg-body)] scrollbar"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full border border-[#511616]  text-[var(--text)] text-lg  font-semibold py-3 rounded-xl hover:bg-[var(--bg-body)] active:scale-95 transition-all duration-95 ease-linear"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default CreateVideoBlog;
