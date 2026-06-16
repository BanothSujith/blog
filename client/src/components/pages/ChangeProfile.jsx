
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { BsCloudUpload } from "react-icons/bs";
import { FiImage } from "react-icons/fi";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { motion, AnimatePresence } from "framer-motion";

import Message from "../../utility/Message";
import Loading3 from "./Loading3";

import { setSettingsPageRequest } from "../../reduxstore/slices";

const imageFormats = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

function ChangeProfile() {
  const [newProfile, setNewProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: false,

    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (
        file &&
        imageFormats.includes(file.type)
      ) {
        setNewProfile(file);
      } else {
        Message(
          "Only image files are allowed!",
          "warning"
        );
      }
    },
  });

  async function handleformSubmit() {
    if (!newProfile) {
      return Message(
        "Profile image is required",
        "warning"
      );
    }

    try {
      const existingCookie =
        localStorage.getItem("user")
          ? JSON.parse(
              localStorage.getItem("user")
            )
          : {};

      const formData = new FormData();

      formData.append(
        "profileImage",
        newProfile
      );

      formData.append(
        "oldprofile",
        existingCookie?.profile
      );

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/editprofile`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      const updatedCookie = {
        ...existingCookie,
        profile:
          response.data.updatedprofile,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedCookie)
      );

      setLoading(false);

      Message(
        response.data.message,
        response.statusText
      );

      navigate(-1);

      dispatch(
        setSettingsPageRequest(true)
      );
    } catch (error) {
      setLoading(false);

      Message(
        "Can't upload profile right now",
        "error"
      );
    }
  }

  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      bg-gradient-to-br
      from-[#020617]
      via-[#0f172a]
      to-[#111827]
      overflow-hidden
      relative
      px-4
    ">

      {/* Glow Effects */}
      <div className="
        absolute top-[-100px] left-[-100px]
        w-[300px] h-[300px]
        bg-cyan-500/20
        blur-3xl
        rounded-full
      " />

      <div className="
        absolute bottom-[-100px] right-[-100px]
        w-[300px] h-[300px]
        bg-blue-600/20
        blur-3xl
        rounded-full
      " />

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          border border-white/20
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          p-8
        "
      >

        {/* Close Button */}
        <button
          onClick={() =>
            window.history.back()
          }
          className="
            absolute top-4 right-4
            w-8 h-8
            rounded-full
            bg-red-500
            hover:bg-red-600
            text-white
            transition-all
            duration-200
            active:scale-95
          "
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="
            text-3xl font-bold text-white
          ">
            Change Profile
          </h1>

          <p className="
            text-gray-300 mt-2 text-sm
          ">
            Upload a new profile picture
          </p>
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`
            relative
            border-2 border-dashed
            rounded-3xl
            p-6
            transition-all duration-300
            cursor-pointer
            overflow-hidden
            ${
              isDragActive
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-white/20 bg-white/5 hover:bg-white/10"
            }
          `}
        >
          <input
            {...getInputProps()}
            accept="image/*"
          />

          <AnimatePresence mode="wait">

            {newProfile ? (
              <motion.div
                key="preview"

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}

                className="
                  flex flex-col
                  items-center gap-4
                "
              >
                <div className="
                  relative
                  w-44 h-44
                ">
                  <img
                    src={URL.createObjectURL(newProfile)}
                    alt="preview"
                    className="
                      w-full h-full
                      object-cover
                      rounded-2xl
                      shadow-2xl
                    "
                  />

                  <div className="
                    absolute inset-0
                    rounded-2xl
                    ring-2 ring-cyan-400/40
                  " />
                </div>

                <div className="text-center">
                  <p className="
                    text-white font-medium
                    line-clamp-1
                  ">
                    {newProfile.name}
                  </p>

                  <p className="
                    text-gray-400 text-sm
                  ">
                    Click or drag to replace
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"

                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                className="
                  flex flex-col
                  items-center justify-center
                  gap-5
                  py-10
                "
              >
                <div className="
                  w-24 h-24
                  rounded-full
                  bg-cyan-500/10
                  flex items-center justify-center
                  border border-cyan-400/20
                ">
                  <BsCloudUpload
                    className="
                      text-5xl
                      text-cyan-400
                    "
                  />
                </div>

                <div className="text-center">
                  <p className="
                    text-white font-semibold text-lg
                  ">
                    Drag & Drop Image
                  </p>

                  <p className="
                    text-gray-400 text-sm mt-1
                  ">
                    or click to browse files
                  </p>
                </div>

                <div className="
                  flex items-center gap-2
                  text-xs text-gray-500
                ">
                  <FiImage />
                  JPG, PNG, GIF, WEBP
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <button
          onClick={handleformSubmit}

          disabled={loading}

          className={`
            mt-8
            w-full h-12
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            text-white
            font-semibold text-lg
            shadow-lg shadow-cyan-500/20
            hover:scale-[1.02]
            hover:shadow-cyan-500/40
            active:scale-95
            transition-all duration-300
            flex items-center justify-center
            ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : ""
            }
          `}
        >
          {loading ? (
            <Loading3 />
          ) : (
            "Upload Profile"
          )}
        </button>
      </motion.div>
    </div>
  );
}

export default ChangeProfile;
