
import React, { useState } from "react";

import {
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";

import { motion } from "framer-motion";

import axios from "axios";

import Message from "../../utility/Message";

function ChangePassword() {
  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState({
      old: false,
      new: false,
      confirm: false,
    });

  const togglePasswordVisibility = (
    field
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Message(
        "New passwords do not match.",
        "warning"
      );

      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/changepassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      Message(
        response.data?.message,
        response.statusText
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response?.data?.message) {
        Message(
          error.response?.data?.message,
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-[#020617]
        via-[#0f172a]
        to-[#111827]
        px-4
        overflow-y-scroll
        overflow-x-hidden
        scrollbar
        relative
      "
    >
      <div className = "absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Glow Effects */}
        <div
          className="
          absolute
          top-[-100px]
          left-[-100px]
          w-[300px]
          h-[300px]
          rounded-full
          bg-cyan-500/20
          blur-3xl
        "
        />

        <div
          className="
          absolute
          bottom-[-100px]
          right-[-100px]
          w-[300px]
          h-[300px]
          rounded-full
          bg-blue-600/20
          blur-3xl
        "
        />
      </div>
      {/* Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{
          opacity: 1,
          height: "auto",
        }}
        transition={{
          duration: 1,
          origin: "bottom",
          ease: "easeInOut",
        }}
        className="
          relative
          z-10
          w-full
          max-w-[25rem]
          rounded-3xl
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          p-6
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            absolute
            top-2
            right-2
            w-6
            h-6
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

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-cyan-500/10
              border border-cyan-400/20
              flex items-center justify-center
              mb-5
            "
          >
            <FaLock
              className="
                text-4xl
                text-cyan-400
              "
            />
          </div>

          <h2
            className="
             text-xl  
            xl:text-3xl
              font-bold
              text-white
            "
          >
            Change Password
          </h2>

          <p
            className="
              text-gray-400
              mt-2
              text-sm
              xl:text-base
            "
          >
            Secure your account with a new password
          </p>
        </div>

        {/* Input Component */}
        {[
          {
            label: "Old Password",
            value: oldPassword,
            setter: setOldPassword,
            field: "old",
            placeholder: "Enter old password",
          },

          {
            label: "New Password",
            value: newPassword,
            setter: setNewPassword,
            field: "new",
            placeholder: "Enter new password",
          },

          {
            label: "Confirm Password",
            value: confirmPassword,
            setter: setConfirmPassword,
            field: "confirm",
            placeholder: "Confirm new password",
          },
        ].map((item, index) => (
          <div key={index} className="mb-5">
            <label
              className="
                block
                text-sm
                text-gray-300
                mb-2
                font-medium
              "
            >
              {item.label}
            </label>

            <div className="relative">
              <input
                type={showPassword[item.field] ? "text" : "password"}
                value={item.value}
                onChange={(e) => item.setter(e.target.value)}
                placeholder={item.placeholder}
                required
                className="
                  w-full
                  h-10
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  text-white
                  px-5
                  pr-14
                  outline-none
                  focus:border-cyan-400
                  focus:bg-white/10
                  transition-all
                  duration-300
                  placeholder:text-gray-500
                "
              />

              <button
                type="button"
                onClick={() => togglePasswordVisibility(item.field)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-cyan-400
                  transition-all
                  duration-200
                "
              >
                {showPassword[item.field] ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            mt-6
            w-full
            h-12
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            text-white
            font-semibold
            text-md
            shadow-lg
            shadow-cyan-500/20
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-cyan-500/40
            active:scale-95
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </motion.form>
    </div>
  );
}

export default ChangePassword;
