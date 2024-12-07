import axios from "axios";

const API_URL = "https://ten-fashion.onrender.com";

export const addToWishlist = async (userId, productId) => {
  console.log(userId, productId);
  try {
    const response = await axios.post(`${API_URL}/wishlist`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/wishlist`, {
      data: { userId, productId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

export const fetchWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};
