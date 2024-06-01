import axiosInstance from "./AxiosConfig";
import store from "../redux/store/store";

export const fetchItemFeedbacks = async (itemId) => {
    try {
        const response = await axiosInstance.get(`/api/feedback/item/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item feedbacks:', error);
        throw error;
    }
};


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

export const updateFeedback = async (feedbackId, updatedFeedback) => {
    const state = store.getState();
    const token = state.auth.user.token;

    try {
        const response = await axiosInstance.put(`/api/feedback/${feedbackId}`, updatedFeedback, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error;
    }
};

export const deleteFeedback = async (feedbackId) => {
    const state = store.getState();
    const token = state.auth.user.token;

    try {
        const response = await axiosInstance.delete(`/api/feedback/${feedbackId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error;
    }
};