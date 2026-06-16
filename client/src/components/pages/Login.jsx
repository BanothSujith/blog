import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../utility/Message";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      Message("Email and password are required.", "warning");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Message("Invalid email address.", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/login`,
        {
          email: email.toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (
        response.data?.message === "Login successful" &&
        response.data?.user
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        Message("Login successful! Redirecting...", "OK");

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 300);
      } else {
        Message(
          "Login successful but no token provided.",
          "warning"
        );
      }
    } catch (error) {
      Message(error.response?.data?.error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative px-4 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]">
      
      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-3xl rounded-full" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">

        {/* Close */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 active:scale-95 text-white flex items-center justify-center"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-300 mt-2 text-sm">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot password?
            </Link>

            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Create account
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full h-12 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-semibold text-lg
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
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Secure authentication system
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({
  type,
  placeholder,
  value,
  onChange,
}) {
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

export default Login;
