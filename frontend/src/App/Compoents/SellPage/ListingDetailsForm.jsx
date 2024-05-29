import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const ListingDetailsForm = ({ mainCategories, subCategories, onMainCategoryChange, selectedMainCategory, onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
    const [longDescription, setLongDescription] = useState(initialData?.longDescription || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [city, setCity] = useState(initialData?.city || '');
    const [state, setState] = useState(initialData?.state || '');
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
            setState(initialData.state);
            setCountry(initialData.country);
            setQuantity(initialData.quantity);
            setSelectedSubCategory(initialData.subCategoryId);
        }
    }, [initialData]);

    useEffect(() => {
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
            state,
            country,
            quantity,
            mainCategoryId: selectedMainCategory,
            subCategoryId: selectedSubCategory,
        };
        onSubmit(itemData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{marginTop: '20px'}}>
                <Typography variant="h6">Title</Typography>
                <TextField
                    label="Listing Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
                <div style={{ flexDirection: 'column', flex: '1', marginTop: '20px' }}>
                    <Typography variant="h6">Description</Typography>
                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
                            rows={9}
                            value={longDescription}
                            onChange={(e) => setLongDescription(e.target.value)}
                        />
                    </Box>
                </div>
                <div style={{ flexDirection: 'column', maxWidth: '550px', marginTop: '20px' }}>
                    <div>
                        <Typography variant="h6">Description</Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={price}
                                sx={{ width: '48%' }}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                label="Quantity"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={quantity}
                                sx={{ width: '48%' }}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        <Typography variant="h6">Item Location</Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                label="City"
                                fullWidth
                                margin="normal"
                                value={city}
                                sx={{ width: '25%', marginRight: '20px' }}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                label="State"
                                fullWidth
                                margin="normal"
                                value={state}
                                sx={{ width: '25%', marginRight: '20px' }}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <TextField
                                label="Country"
                                fullWidth
                                margin="normal"
                                value={country}
                                sx={{ flex: '1'}}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6">Category</Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                label="Main Category"
                                select
                                fullWidth
                                margin="normal"
                                value={selectedMainCategory}
                                sx={{ width: '48%' }}
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
                                sx={{ width: '48%' }}
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
                    </div>

                </div>
            </Box>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, alignSelf: 'flex-end' }} type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default ListingDetailsForm;