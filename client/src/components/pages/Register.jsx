import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Message from "../../utility/Message";
import Loading3 from "./Loading3";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNo || !password || !profile) {
      Message("All fields are required.", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/register`,
        {
          name,
          email,
          phoneNo,
          password,
          profile,
          coverImg,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Message("Registration successful! Redirecting...", "OK");

        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 300);
      } else {
        Message(response.data?.message || "Registration failed.", "error");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);

      Message(
        error.response?.data?.message || "Something went wrong.",
        "error"
      );

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-4 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2 text-sm">
            Join and start your journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Profile Upload */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Profile Picture
            </label>

            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-blue-400 transition-all bg-white/5">
              <div className="text-center">
                <p className="text-white text-sm">
                  {profile ? profile.name : "Upload Profile Image"}
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Cover Upload */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Cover Image
            </label>

            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-pink-400 transition-all bg-white/5">
              <div className="text-center">
                <p className="text-white text-sm">
                  {coverImg ? coverImg.name : "Upload Cover Image"}
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverImg(e.target.files[0])}
              />
            </label>
          </div>

          {/* Name */}
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone */}
          <InputField
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          {/* Password */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-blue-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center"
          >
            {loading ? <Loading3 /> : "Create Account"}
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({ type, placeholder, value, onChange }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full h-12 px-4 rounded-xl
          bg-white/10 border border-white/20
          text-white placeholder-gray-400
          outline-none
          focus:border-cyan-400
          focus:ring-2 focus:ring-cyan-400/30
          transition-all duration-300
        "
      />
    </div>
  );
}

export default Register;
