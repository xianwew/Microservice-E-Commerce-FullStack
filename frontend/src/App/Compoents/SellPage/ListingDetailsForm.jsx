import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const ListingDetailsForm = ({ mainCategories, subCategories, onMainCategoryChange, selectedMainCategory, onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
    const [longDescription, setLongDescription] = useState(initialData?.longDescription || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [city, setCity] = useState(initialData?.city || '');
    const [country, setCountry] = useState(initialData?.country || '');
    const [quantity, setQuantity] = useState(initialData?.quantity || '');
    const [selectedSubCategory, setSelectedSubCategory] = useState(initialData?.subCategoryId || '');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setShortDescription(initialData.shortDescription);
            setLongDescription(initialData.longDescription);
            setPrice(initialData.price);
            setCity(initialData.city);
            setCountry(initialData.country);
            setQuantity(initialData.quantity);
            setSelectedSubCategory(initialData.subCategoryId);
        }
    }, [initialData]);

    useEffect(() => {
        // Only reset selected subcategory if the selected main category changes and it's not the initial load
        if (!initialData || selectedMainCategory !== initialData.mainCategoryId) {
            setSelectedSubCategory('');
        }
    }, [selectedMainCategory, initialData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const itemData = {
            title,
            shortDescription,
            longDescription,
            price,
            city,
            country,
            quantity,
            mainCategoryId: selectedMainCategory,
            subCategoryId: selectedSubCategory,
        };
        onSubmit(itemData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Listing Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="Brief Description"
                fullWidth
                margin="normal"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
            />
            <TextField
                label="Long Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="City"
                    fullWidth
                    margin="normal"
                    value={city}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    label="Country"
                    fullWidth
                    margin="normal"
                    value={country}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="Main Category"
                    select
                    fullWidth
                    margin="normal"
                    value={selectedMainCategory}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => onMainCategoryChange(e.target.value)}
                >
                    {mainCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Sub Category"
                    select
                    fullWidth
                    margin="normal"
                    value={selectedSubCategory}
                    sx={{ width: '48%', minWidth: '80px' }}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    disabled={!selectedMainCategory}
                >
                    {Array.isArray(subCategories) ? subCategories.map((subCategory) => (
                        <MenuItem key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                        </MenuItem>
                    )) : null}
                </TextField>
            </div>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, float: 'right' }} type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default ListingDetailsForm;