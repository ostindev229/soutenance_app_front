import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postulates: [],
  applyData: {
    name: "",
    surname: "",
    applyDate: "",
    selectedCvFile: "",
  },
  loading: false,
  error: null,
};

const postulateSlice = createSlice({
  name: "postulates",
  initialState,
  reducers: {
    setPostulatesInState: (state, action) => {
      state.postulates = [...action.payload]; // Corrige l'état cible
    },
    setApplyDataInState: (state, action) => {
      // Corrige le nom de l'action
      state.applyData = { ...state.applyData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPostulatesInState,
  setApplyDataInState,
  setLoading,
  setError,
} = postulateSlice.actions; // Assurez-vous que les actions correspondent

export default postulateSlice.reducer;
