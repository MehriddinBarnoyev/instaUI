import axios from "axios";
import { authHeader } from "./auth";

const API_URL = "http://localhost:5000/api/posts";



// Get posts by user ID
export const getMyPosts = async (userId: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/my-posts/${userId}`);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch user posts");
    }
};

// Get a single post by ID
export const getAllPosts = async (postId: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/all`);
        console.log(data);
        
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch post");
    }
};

// Create a new post
export const createPost = async (userId: string, text: string, image?: string) => {
    try {
        const { data } = await axios.post(
            `${API_URL}/create/${userId}`,
            { text, image },
            { headers: { "Content-Type": "application/json", ...authHeader() } }
        );
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create post");
    }
};

// Delete a post
export const deletePost = async (userId: string, postId: string) => {
    try {
        const { data } = await axios.delete(`${API_URL}/delete/${userId}`, {
            data: { post_id: postId },
            headers: { "Content-Type": "application/json", ...authHeader() },
        });
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete post");
    }
};