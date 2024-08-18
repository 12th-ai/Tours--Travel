import axios from "axios";

const BASE_URL = "http://localhost:3000/api/auth";

export const userService = {
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create user");
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials, {
        withCredentials: true, // Include credentials with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Incorrect credentials");
      }
    }
  },
  fetchProfileData: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials if needed
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile data"
      );
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);

      return response.data;
    } catch (error) {
      throw new Error("There was an error fetching the users!");
    }
  },
  updateUser: async (id, userData) => {
    try {
      console.log("update user with ID:", id);
      console.log("update user with data:", userData);
      const response = await axios.put(`${BASE_URL}/update/${id}`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  deleteUser: async (id) => {
    try {
      // Log the ID before making the request to ensure it's passed correctly
      console.log("Deleting user with ID:", id);

      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log the ID again after a successful deletion
      console.log("Deleted user with ID:", id);

      return response.data;
    } catch (error) {
      // Log the ID in case of an error
      console.log("Failed to delete user with ID:", id);

      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },

  // Add more reusable API functions as needed
};
