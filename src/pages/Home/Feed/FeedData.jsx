import axios from "axios";

const API_URL = "http://localhost:5000/api/post/all";

export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    const allPosts = response.data;
    return allPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
