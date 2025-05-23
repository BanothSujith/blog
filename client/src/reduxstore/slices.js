import { createSlice } from "@reduxjs/toolkit";

const safeParseJSON = (key, defaultValue) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const savedTheme = localStorage.getItem("theme") || "bright";
const savedVideos = safeParseJSON("videos", []);
const savedGalleryVideos = safeParseJSON("gallery", []);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: savedTheme,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

const videoPlayingSlice = createSlice({
  name: "videoPlaying",
  initialState: {
    isVideoPlaying: false,
    videos: savedVideos,
    galleryVideos: savedGalleryVideos,
    isSettingsPageRequest: false,
    message: "",
    messageStatus: "",
    chatBot:false,
  },
  reducers: {
    changeVideoPlaying: (state, action) => {
      state.isVideoPlaying = action.payload;
    },
    setVideos: (state, action) => {
      // Sort by latest added (assuming a `createdAt` or `timestamp` field exists)
      const sortedVideos = [...action.payload].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      state.videos = sortedVideos;
      localStorage.setItem("videos", JSON.stringify(sortedVideos));
    },
    setGalleryVideos: (state, action) => {
      const sortedGallery = [...action.payload].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      state.galleryVideos = sortedGallery;
      localStorage.setItem("gallery", JSON.stringify(sortedGallery));
    },
    setSettingsPageRequest: (state) => {
      state.isSettingsPageRequest = !state.isSettingsPageRequest;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageStatus: (state, action) => {
      state.messageStatus = action.payload;
    },
    
    setChatBot:(state)=>{
      state.chatBot = !state.chatBot;
    }
  },
});

// Export Actions
export const { changeTheme } = themeSlice.actions;
export const {
  changeVideoPlaying,
  setVideos,
  setGalleryVideos,
  setSettingsPageRequest,
  setMessage,
  setMessageStatus,
  setSearchPageRequest,
  setChatBot,
} = videoPlayingSlice.actions;

// Export Reducers
export const themeReducer = themeSlice.reducer;
export const videoPlayingReducer = videoPlayingSlice.reducer;
