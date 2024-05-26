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