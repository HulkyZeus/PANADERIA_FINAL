import axios from "./axios";

export const getUsersRequest = () => axios.get("/admin/users");
export const getUserRequest = (id) => axios.get(`/admin/users/${id}`);
export const updateUserRequest = (id, user) => axios.put(`/admin/users/${id}`, user);
export const deleteUserRequest = (id) => axios.delete(`/admin/users/${id}`);
export const updateUserRoleRequest = async (userId, { role }) => {
  try {
    const response = await axios.put(`/admin/users/${userId}/role`, { role });
    return response;
  } catch (error) {
    throw error;
  }
};