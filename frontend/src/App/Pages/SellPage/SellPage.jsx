import React, { useState, useEffect } from 'react';
import ImageUpload from '../../Compoents/SellPage/ImageUpload';
import ListingDetailsForm from '../../Compoents/SellPage/ListingDetailsForm';
import { fetchMainCategories, fetchSubCategories } from '../../service/CategoryService';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { createListing } from '../../service/ListingsService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../redux/slice/snackbarSlice';

const SellPage = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchMainCategories();
            setMainCategories(categories);
        };

        loadCategories();
    }, []);

    const handleMainCategoryChange = async (mainCategoryId) => {
        setSelectedMainCategory(mainCategoryId);
        const subCategories = await fetchSubCategories(mainCategoryId);
        setSubCategories(subCategories);
    };

    const handleCoverImageUpload = (file) => {
        setCoverImage(file);
    };

    const handleAdditionalImagesUpload = (files) => {
        setAdditionalImages(files);
    };

    const handleSubmit = async (itemData) => {
        try {
            dispatch(showSnackbar({ open: true, message: 'Creating listing...', severity: 'info' }));
            const newListing = await createListing(itemData, coverImage, additionalImages);
            console.log('New listing created:', newListing);
            dispatch(showSnackbar({ open: true, message: 'Listing created successfully!', severity: 'success' }));
            navigate('/');
        } catch (error) {
            console.error('Failed to create listing:', error);
            dispatch(showSnackbar({ open: true, message: 'Failed to create listing.', severity: 'error' }));
        }
    };

    return (
        <div className='app-content' style={{ justifyContent: 'center' }}>
            <div style={{ padding: '50px 80px 80px 80px', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" fontWeight="bold" mb={1} textAlign='center'>Create a New Listing</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '25%', minWidth: '380px' }}>
                        <ImageUpload
                            initialCoverImage={coverImage}
                            initialAdditionalImages={additionalImages}
                            onCoverImageUpload={handleCoverImageUpload}
                            onAdditionalImagesUpload={handleAdditionalImagesUpload}
                        />
                    </div>
                    <div style={{ flex: '1' }}>
                        <ListingDetailsForm
                            mainCategories={mainCategories}
                            subCategories={subCategories}
                            onMainCategoryChange={handleMainCategoryChange}
                            selectedMainCategory={selectedMainCategory}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellPage;