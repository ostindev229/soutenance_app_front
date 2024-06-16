import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api/index.js";

export const submitPostulate = createAsyncThunk(
  "postulates/submitPostulate",
  async (applyData, thunkAPI) => {
    try {
      const response = await api.postulateJob(applyData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const validateJobApplicationAction = async (jobOfferId, candidateId) => {
  try {
    const response = await api.validateJobApplication(jobOfferId, candidateId);

    return response.data;
  } catch (error) {
    return;
  }
};

export const getPostulatesByJobOfferId = async (jobOfferId) => {
  return api.fetchPostulatesByJobOfferId(jobOfferId);
};

export const getJobsInfoByCandidateId = async () => {
  try {
    const response = await api.getJobsInfoByCandidateId();
    console.log(response.data);
    return response.data;
  } catch (error) {
    return;
  }
};
