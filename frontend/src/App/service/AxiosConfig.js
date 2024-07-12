import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://www.xianwei-e-commerce.com', 
});

export default axiosInstance;