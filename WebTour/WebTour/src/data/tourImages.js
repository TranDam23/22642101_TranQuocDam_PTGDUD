// tourImages.js
import axios from "axios";

const API_URL = "http://localhost:3002/get-tour-images";

export const getTourImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour images:", error);
    return [];
  }
};
