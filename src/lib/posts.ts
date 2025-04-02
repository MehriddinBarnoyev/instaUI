import axios from "axios"

// Define API URL - replace with your actual API URL
const API_URL = "http://localhost:5000/api/post"

/**
 * Create a new post
 * @param userId - The ID of the user creating the post
 * @param text - The text content of the post
 * @param image - Optional base64 encoded image
 * @returns The created post data
 */
export const createPost = async (userId: string, text: string, image?: File) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("user_id", userId);
    if (image) {
        formData.append("image", image);
    }
    
    try {
        const { data } = await axios.post(`${API_URL}/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Post yaratishda xatolik");
    }
}

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/all`);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Postlarni olishda xatolik");
    }
}

/**
 * Get posts by user ID
 * @param userId - The ID of the user
 * @returns Array of posts by the specified user
 */
export const getUserPosts = async (userId: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/user/${userId}`)
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch user posts")
    }
}

/**
 * Get a single post by ID
 * @param postId - The ID of the post
 * @returns The post data
 */
export const getPostById = async (postId: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/${postId}`)
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch post")
    }
}

/**
 * Delete a post
 * @param postId - The ID of the post to delete
 * @param userId - The ID of the user who owns the post
 * @returns The deleted post data
 */
export const deletePost = async (postId: string, userId: string) => {
    try {
        const { data } = await axios.delete(`${API_URL}/${postId}/${userId}`)
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete post")
    }
}

/**
 * Like or unlike a post
 * @param postId - The ID of the post
 * @param userId - The ID of the user liking/unliking
 * @returns Updated post data
 */
export const toggleLikePost = async (postId: string, userId: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/like/${postId}/${userId}`)
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to like/unlike post")
    }
}

/**
 * Add a comment to a post
 * @param postId - The ID of the post
 * @param userId - The ID of the user commenting
 * @param text - The comment text
 * @returns Updated post data with the new comment
 */
export const addComment = async (postId: string, userId: string, text: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/comment/${postId}/${userId}`, { text })
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to add comment")
    }
}

