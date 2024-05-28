import axiosInstance from './AxiosConfig';
import store from '../redux/store/store';

export const createListing = async (itemData, coverImage, additionalImages) => {
    const formData = new FormData();
    formData.append('item', new Blob([JSON.stringify(itemData)], {
        type: 'application/json'
    }));

    if (coverImage) {
        formData.append('imageFile', coverImage);
    }

    additionalImages.forEach((file, index) => {
        formData.append('subImageFiles', file);
    });

    const state = store.getState();
    const token = state.auth.token;

    const response = await axiosInstance.post('/api/item', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
};
