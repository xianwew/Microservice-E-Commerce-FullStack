import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, TextField, MenuItem, Button } from '@mui/material';
import ImageUpload from '../../Compoents/SellPage/ImageUpload';
import ListingDetailsForm from '../../Compoents/SellPage/ListingDetailsForm';
import { fetchMainCategories, fetchSubCategories } from '../../service/CategoryService';

const SellPage = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');

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

    return (
        <div className='app-content' style={{ justifyContent: 'center' }}>
            <div style={{ padding: '50px 80px 80px 80px', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" fontWeight="bold" mb={6} textAlign='center'>Create a New Listing</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ImageUpload />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ListingDetailsForm
                            mainCategories={mainCategories}
                            subCategories={subCategories}
                            onMainCategoryChange={handleMainCategoryChange}
                            selectedMainCategory={selectedMainCategory}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default SellPage;