import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Set your backend server URL here
});

export default axiosInstance;