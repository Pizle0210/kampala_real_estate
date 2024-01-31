import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};
try {
  const storedUserInfo = localStorage.getItem("userInfo"); // Suggestion 2
  if (storedUserInfo) {
    const parsedUserInfo = JSON.parse(storedUserInfo);
    initialState.userInfo = parsedUserInfo; // Suggestion 1
  }
} catch (error) {
  console.error("Error parsing data from session Storage", error);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
