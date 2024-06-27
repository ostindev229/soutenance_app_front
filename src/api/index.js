import axios from "axios";

const API = axios.create({
  baseURL: "https://polar-forest-66401-1d69e2d8b47d.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("userToken");

  // Vérifier si le token JWT est présent et non null
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchPosts = () => {
  return API.get("/api/job", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const fetchAllPosts = () => {
  return API.get("/api/job/all-jobs", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const fetchAllPostsForVerif = () => {
  return API.get("/api/admin/get-all-jobs", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const updateJobStatus = (jobId, status) => {
  return API.post(
    "/api/admin/update-job-status",
    { jobId, status },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

// /auth/me => GET

export const me = () => {
  return API.get("/api/auth/me", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const verifyOTP = (phoneNumber, code) => {
  return API.post("/api/auth/verification-phone", { phoneNumber, code });
};

export const resendOTP = async (phoneNumber) => {
  return await API.post("/api/auth/resend-otp", { phoneNumber });
};

export const adminLogin = (formData) => {
  return API.post("/api/admin/login", formData);
};

export const createPost = (postData) => {
  return API.post("/api/job/create", postData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const getPostStateValue = () => {
  return API.get("/api/job/stats", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const deletePost = (id) => {
  return API.delete(`/api/job/delete/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const deletePostByEmployee = (id) => {
  return API.delete(`/api/user/employee/jobs/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const updatePost = (id, updatedData) => {
  return API.patch(`/api/job/update/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const postulateJob = (applyData) => {
  return API.post("/api/candidate/postulate", applyData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const fetchPostulatesByJobOfferId = (jobOfferId) => {
  return API.get(`/api/candidate/postulates/${jobOfferId}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const validateJobApplication = (jobOfferId, candidateId) => {
  return API.post(
    `/api/job/validate-job-application/${jobOfferId}`,
    { candidateId },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

export const rejectJobApplication = (id) => {
  return API.post(
    `api/user/recruiter/application/reject/${id}`,

    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

export const searchJobByValue = (category, typeTemps, location) => {
  console.log(category);
  console.log(location);
  console.log(typeTemps);

  return API.get("/api/job/search", {
    params: {
      category: category,
      typeTemps: typeTemps,
      location: location,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const updateProfil = (formData) => {
  return API.put("/api/user/update", formData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const getJobsInfoByCandidateId = () => {
  return API.get("/api/user/employee/jobs", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

export const signIn = (formData) => API.post("/api/auth/login", formData);

export const signUp = (formData) => API.post("/api/auth/signup", formData);

export default API;
