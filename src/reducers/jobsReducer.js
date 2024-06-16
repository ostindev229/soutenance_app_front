import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsInState: (state, action) => {
      state.posts = [...action.payload];
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePostInState: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePostInState: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
});

export const {
  setPostsInState,
  addPost,
  deletePostInState,
  updatePostInState,
} = postsSlice.actions;
export default postsSlice.reducer;
