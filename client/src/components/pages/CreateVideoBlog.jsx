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
   <div className="h-screen bg-[#0a0a0a] text-white flex items-cente justify-center px-4 py-2 overflow-hidden">
     <form
       onSubmit={handleSubmit}
       className="
        w-full max-w-[60rem]
        grid lg:grid-cols-2
        rounded-[2rem]
        overflow-scroll
        overflow-x-hidden
        hidescroolbar

        border border-white/10
        bg-[#111]
        shadow-[0_0_80px_rgba(0,0,0,0.6)]
      "
     >
       {/* LEFT SIDE */}
       <div className="relative p-8 md:p-10 border-r border-white/10">
         {/* Close */}
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

         <div className="mb-10">
           <p className="uppercase tracking-[0.3em] text-xs text-zinc-500 mb-3">
             Creator Studio
           </p>

           <h1 className="text-5xl font-black leading-tight">
             Upload
             <span className="block text-zinc-500">Video Blog</span>
           </h1>
         </div>

         {/* Video Upload */}
         <div
           {...getVideoRootProps()}
           className={`
            group
            relative
            h-[260px]
            rounded-3xl
            border
            overflow-hidden
            cursor-pointer
            transition-all duration-500
            flex flex-col items-center justify-center
            ${
              isVideoDragActive
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-white/10 hover:border-cyan-500"
            }
          `}
         >
           <input {...getVideoInputProps()} accept="video/*" />

           <div
             className="
              absolute inset-0
              bg-gradient-to-br
              from-cyan-500/10
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-all duration-500
            "
           />

           <BsCloudUpload className="text-7xl text-cyan-400 mb-5 z-10" />

           {video ? (
             <div className="z-10 text-center px-4">
               <p className="font-bold text-lg break-all">{video.name}</p>

               <p className="text-zinc-500 text-sm mt-2">
                 Video ready to upload
               </p>
             </div>
           ) : (
             <div className="z-10 text-center">
               <p className="text-2xl font-bold">Drop your video</p>

               <p className="text-zinc-500 mt-2">MP4, WEBM, MOV supported</p>
             </div>
           )}
         </div>

         {/* Thumbnail */}
         <div
           {...getThumbnailRootProps()}
           className="
            mt-6
            group
            border border-white/10
            hover:border-pink-500
            transition-all duration-500
            rounded-2xl
            p-5
            flex items-center gap-5
            cursor-pointer
          "
         >
           <input {...getThumbnailInputProps()} accept="image/*" />

           <div
             className="
              min-w-[70px]
              h-[70px]
              rounded-2xl
              bg-pink-500/10
              flex items-center justify-center
            "
           >
             <BsCloudUpload className="text-3xl text-pink-400" />
           </div>

           <div>
             <p className="font-semibold text-lg">
               {coverImg ? coverImg.name : "Upload Thumbnail"}
             </p>

             <p className="text-zinc-500 text-sm mt-1">PNG, JPG, WEBP</p>
           </div>
         </div>
       </div>

       {/* RIGHT SIDE */}
       <div className="p-8 md:p-10 flex flex-col justify-between">
         <div className="space-y-8">
           {/* Title */}
           <div className="relative">
             <label className="text-sm text-zinc-500 uppercase tracking-[0.2em]">
               Title
             </label>

             <input
               type="text"
               required
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Enter title..."
               className="
                w-full
                mt-3
                bg-transparent
                border-b border-white/10
                focus:border-cyan-500
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
               placeholder="Write something amazing..."
               className="
                w-full
                mt-3
                bg-[#0d0d0d]
                border border-white/10
                focus:border-cyan-500
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
            hover:bg-cyan-400
            hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
            transition-all duration-300
            active:scale-[0.98]
          "
         >
           {loading ? "Uploading..." : "Publish Video"}
         </button>
       </div>
     </form>
   </div>
 );
}

export default CreateVideoBlog;
