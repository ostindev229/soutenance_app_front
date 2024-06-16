import * as api from "../api/index.js";
import { setPostsInState } from "../reducers/jobsReducer.js";
import { deletePostInState } from "../reducers/jobsReducer.js";
import { updatePostInState } from "../reducers/jobsReducer.js";
import { toast } from "react-toastify";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    console.log(data);
    dispatch(setPostsInState(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllPosts();

    console.log(data);
    dispatch(setPostsInState(data));
  } catch (error) {
    console.log(error);
  }
};

export const getPostStateValue = async () => {
  try {
    const { data } = await api.getPostStateValue();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostsForVerif = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllPostsForVerif();

    console.log(data);
    dispatch(setPostsInState(data));
  } catch (error) {
    console.log(error);
  }
};

export const searchJobByValue = async (category, location, typeTemps) => {
  try {
    const { data } = await api.searchJobByValue(category, location, typeTemps);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    await api.createPost(post);

    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(deletePostInState(id));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const updatePost = (id, updatedData) => async (dispatch) => {
  try {
    const response = await api.updatePost(id, updatedData);
    dispatch(updatePostInState(response.data));
    toast.success("L'offre a été modifiée avec succès");
  } catch (error) {
    console.error("Failed to update post: ", error);
    toast.error("Erreur lors de la mise à jour de l'offre");
  }
};

export const updateJobStatus = (jobId, status) => async (dispatch) => {
  try {
    const response = await api.updateJobStatus(jobId, status);
    const updatedPost = response.data;
    dispatch(updatePostInState(updatedPost));
    console.log("Succesfully");
  } catch (error) {
    console.error(error);
  }
};
