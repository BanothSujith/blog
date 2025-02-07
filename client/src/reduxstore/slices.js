import { createSlice } from '@reduxjs/toolkit';

// Load saved theme & videos from localStorage
const savedTheme = localStorage.getItem('theme') || 'bright';
const savedVideos = JSON.parse(localStorage.getItem('videos')) || [];

// Theme Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: savedTheme, // Load from localStorage
  },
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', action.payload); // Save to localStorage
    },
  },
});

// Video Playing Slice
const videoPlayingSlice = createSlice({
  name: 'videoPlaying',
  initialState: {
    isVideoPlaying: false,
    videos: savedVideos, // Load from localStorage
  },
  reducers: {
    changeVideoPlaying: (state, action) => {
      state.isVideoPlaying = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
      localStorage.setItem('videos', JSON.stringify(action.payload)); // Save to localStorage
    },
  },
});

// Export Actions
export const { changeTheme } = themeSlice.actions;
export const { changeVideoPlaying, setVideos } = videoPlayingSlice.actions;

// Export Reducers
export const themeReducer = themeSlice.reducer;
export const videoPlayingReducer = videoPlayingSlice.reducer;
