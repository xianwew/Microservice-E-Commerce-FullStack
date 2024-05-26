import axiosInstance from "./AxiosConfig";
import { useSelector } from 'react-redux';
import { decodeToken } from "../Auth/JwtUtils";
import store from '../redux/store/store';
import { setUser } from "../redux/slice/authSlice";

export const fetchUser = async () => {
    const state = store.getState();
    const token = state.auth.token;
    if (!token) {
        return;
    }

    const decoded = decodeToken(token);
    const userId = decoded.sub;

    try {
        const response = await axiosInstance.get(`/api/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        store.dispatch(setUser({ user: response.data }));
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const saveUserProfile = async (user, username, file) => {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify({
        id: user.id,
        username: username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl
    })], {
        type: "application/json"
    }));

    if (file) {
        formData.append('profilePicture', file);
    }

    const state = store.getState();
    const token = state.auth.token;
    const response = await axiosInstance.put(`/api/user/${user.id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    store.dispatch(setUser({ user: response.data }));
    return response.data;
};