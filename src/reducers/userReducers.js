import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  formData: {
    phoneNumber: "",
    password: "",
  },
  isLoaading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInState: (state, action) => {
      state.users = { ...state.users, ...action.payload };
    },
    setFormDataInState: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserInState, setFormDataInState, setIsLoading } =
  userSlice.actions;
export default userSlice.reducer;
