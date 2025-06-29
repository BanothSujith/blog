import axios from "axios";
import React from "react";
import Message from "../../utility/Message";

function CommentDelete({ ownerid="", commentid="", id="", setResData="", onClose=null ,endpoint=""}) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleDeletecomment = async () => {
    try {
      
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URI}/${endpoint}`,
        {},
        { withCredentials: true }
      );
       setResData(id)
      onClose(null);
      Message("Deleted ", "OK");
    } catch (error) {
      Message("can't proceed right now", "OK");
    }
  };

  return (
    <div className="text-[var(--text)] text-sm font-semibold bg-[var(--smallcard)]  py-1 flex flex-col  items-center justify-between rounded-md ">
      {commentid == user._id || ownerid == user._id ? (
        <button
          onClick={handleDeletecomment}
          className=" flex items-center gap-1 border-b px-3  "
        >
          <span className="h-2 w-2  bg-red-700 rounded-full "></span> Delete
        </button>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          Message("reported successfully", "OK");
          onClose(null);
        }}
        className="flex items-center gap-1 px-3  rounded-lg"
      >
        <span className="h-2 w-2  bg-yellow-700 rounded-full "></span> Report
      </button>
    </div>
  );
}

export default CommentDelete;
