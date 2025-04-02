import axios from "axios";

const API_URL = "http://localhost:5000/api/likes";

export const likePost = async (post_id: string, user_id: string) => {
    const params = {
        post_id,
        user_id
    }
    try {
        const response = await axios.post(`${API_URL}/like`, params);
        return response.status === 201;
    } catch (error) {
        console.error("Error liking post:", error);
        return false;
    }
};

export const unlikePost = async (userId, postId) => {
    try {
        const response = await axios.post(`${API_URL}/unlike/${userId}`, {
            data: { post_id: postId },
        });
        return response.status === 201;
    } catch (error) {
        console.error("Error unliking post:", error);
        return false;
    }
};