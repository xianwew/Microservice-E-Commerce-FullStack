import axiosInstance from "./AxiosConfig";
import store from "../redux/store/store";

export const submitFeedback = async (itemId, feedback) => {
    const state = store.getState();
    const token = state.auth.user.token;

    try {
        const response = await axiosInstance.post(`/api/feedback/item/${itemId}`, feedback, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};