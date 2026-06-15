import React, { useState, useEffect, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setChatBot } from "../../reduxstore/slices";

const initialChat = [
  {
    _id: 1,
    sent: "",
    received: "Hello! How may I assist you today?",
  },
];

function ChatBot({ fullScreen, setFullScreen }) {
  const [promt, setPromt] = useState("");
  const [ispromtsend, setPromtsend] = useState(false);
  const [chat, setChat] = useState(initialChat);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [isMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, [chat]);

  const showErrorMessage = () => {
    setChat((prevChat) =>
      prevChat.map((msg, i) =>
        i === prevChat.length - 1
          ? {
              ...msg,
              received: "Something went wrong on the server. Please try again.",
            }
          : msg,
      ),
    );

    setPromtsend(false);
  };

  const handlePromtsubmit = async (e) => {
    e?.preventDefault();

    if (!promt.trim() || ispromtsend) return;

    const currentPrompt = promt;

    const newMessage = {
      _id: Date.now(),
      sent: currentPrompt,
      received: "",
    };

    setChat((prevChat) => [...prevChat, newMessage]);
    setPromt("");
    setPromtsend(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/chatbot`,
        { promt: currentPrompt },
        { withCredentials: true },
      );

      console.log("Chatbot response:", response.data);

      if (!response?.data || !response?.data?.response) {
        showErrorMessage();
        return;
      }

      const fullResponse = response.data.response
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/\n/g, "\n\n");

      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        setChat((prevChat) =>
          prevChat.map((msg, i) =>
            i === prevChat.length - 1
              ? {
                  ...msg,
                  received: fullResponse.slice(0, currentIndex + 1),
                }
              : msg,
          ),
        );

        currentIndex++;

        if (currentIndex >= fullResponse.length) {
          clearInterval(typingInterval);
          setPromtsend(false);
        }
      }, 20); // typing speed
    } catch (error) {
      console.error("Error fetching chatbot response:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
      }

      showErrorMessage();
    }
  };

  const handlefullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col justify-between gap-2 bg-[var(--bg-card)] ${
        fullScreen || isMobile ? "h-full" : "h-96"
      } w-full px-2 py-2`}
    >
      <div className="flex items-center">
        <button
          className="text-xl active:scale-95 transition-all duration-75 ease-in pb-[2px] text-[var(--text)]"
          onClick={() => dispatch(setChatBot())}
        >
          <MdOutlineArrowBackIos />
        </button>

        <h1 className="text-2xl font-semibold shadow-sm w-full text-center text-[var(--text)]">
          Chat Bot
        </h1>

        <button
          className={`hidden md:block relative h-2 p-[5px] rounded-[2px] border-2 border-[var(--border)] ${
            fullScreen ? "mx-4" : "mx-3"
          } bg-[var(--bg-card)]`}
          title={fullScreen ? "Min Screen" : "Full Screen"}
          onClick={handlefullScreen}
        >
          {fullScreen && (
            <span className="absolute hidden md:block p-[5px] border-2 rounded-[2px] -top-[6.5px] left-[3px] border-[var(--border)]"></span>
          )}
        </button>

        <button
          className={`hidden md:block text-xl font-semibold text-[#ff2323] hover:text-[#aa3535] active:scale-95 transition-all duration-75 ease-in ${
            fullScreen ? "pb-[8px]" : "pb-[2px]"
          }`}
          onClick={() => {
            dispatch(setChatBot());
            setFullScreen(false);
          }}
        >
          x
        </button>
      </div>

      <div className="flex flex-col overflow-auto justify-start h-full">
        <div className="overflow-auto scrollbar" ref={chatContainerRef}>
          {chat.map((message) => (
            <div key={message._id} className="flex flex-col gap-4 p-2">
              <div className="flex justify-end">
                {message.sent && (
                  <div className="bg-[#4c38bb] font-medium text-sm text-white p-2 rounded-lg max-w-[70%]">
                    {message.sent}
                  </div>
                )}
              </div>

              <div className="flex justify-start">
                {message.received ? (
                  <motion.div
                    className="bg-[#f3f1f1] text-sm text-black font-medium p-2 rounded-lg max-w-[70%] whitespace-pre-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {message.received}
                  </motion.div>
                ) : (
                  <div className="bg-white w-fit px-4 py-3 mx-2 rounded-md flex items-center justify-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 0.3,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                        className="bg-black p-1 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        className={`flex w-full items-center ${
          fullScreen ? "px-12 gap-12" : "px-2 gap-4"
        }`}
        onSubmit={handlePromtsubmit}
      >
        <input
          type="text"
          placeholder="Ask something here..."
          value={promt}
          onChange={(e) => setPromt(e.target.value)}
          className="w-full h-12 rounded-full border-2 font-medium border-[var(--text)] text-[var(--text)] px-4 outline-none bg-transparent"
        />

        <button
          type="submit"
          disabled={ispromtsend || !promt.trim()}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <LuSendHorizontal className="text-4xl text-[var(--text)]" />
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
