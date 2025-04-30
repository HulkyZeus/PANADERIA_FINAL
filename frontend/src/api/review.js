import axios from "./axios";

export const getReviewsRequest = () => axios.get("/reviews");

export const getReviewRequest = (id) => axios.get(`/reviews/${id}`);

export const createReviewRequest = (review) => axios.post("/reviews", review);

export const updateReviewRequest = (id, review) => axios.put(`/reviews/${id}`, review);

export const deleteReviewRequest = (id) => axios.delete(`/reviews/${id}`);