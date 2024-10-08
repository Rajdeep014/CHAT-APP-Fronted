import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenu: false,
  isSearch: false, // Corrected typo from 'isSearh' to 'isSearch'
  isFileMenu: false, // Corrected typo from 'isFileMemu' to 'isFileMenu'
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobileMenu: (state, action) => {
      // Changed to unique name
      state.isMobileMenu = action.payload;
    },
    setIsSearch: (state, action) => {
      // Changed to unique name
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      // Changed to unique name
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      // Changed to unique name
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
    // Add other reducers here (if needed
  },
});

export default miscSlice;
export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setIsMobileMenu,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;
