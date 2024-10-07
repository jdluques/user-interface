import axios from "axios";

const BACKEND_URL = process.env.REACT_BACKEND_URL;

export const fetchUserById = async (id, token) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/orchestrator/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user by ID");
  }
};

export const updateUserById = async (id, body, token) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/orchestrator/users/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to update user");
  }
};

export const deleteUserById = async (id, token) => {
  try {
    await axios.delete(`${BACKEND_URL}/orchestrator/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User deleted successfully");
  } catch (error) {
    throw new Error(error.message || "Failed to delete user");
  }
};
