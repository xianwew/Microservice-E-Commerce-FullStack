import axiosInstance from "./AxiosConfig";

export const createOrder = async (cartId, shippingMethodId, cardId) => {
    try {
        const response = await axiosInstance.post('/api/orders', {
            cartId,
            shippingMethodId,
            cardId
        });
        
        return response.data; // This should return the order ID or other relevant data
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
