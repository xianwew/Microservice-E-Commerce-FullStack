import axiosInstance from "./AxiosConfig";
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

export const saveUserProfile = async (user, email, phoneNumber, firstName, lastName, address, file) => {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify({
        id: user.id,
        username: user.username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        profilePictureUrl: user.profilePictureUrl
    })], {
        type: "application/json"
    }));

    if (file) {
        formData.append('profilePicture', file);
    }

    const state = store.getState();
    const token = state.auth.token;

    try {
        const response = await axiosInstance.put(`/api/user/${user.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        store.dispatch(setUser({ user: response.data }));
        return response.data;
    } catch (error) {
        console.error('Failed to update user profile:', error);
        throw error;
    }
};
